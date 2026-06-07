import type { Config, Plugin, PluginOptions } from "@opencode-ai/plugin";

interface OpenCodeFreeModelsPluginOptions extends PluginOptions {
    /**
     * The alias to use for free models. This can be any string, but should be something that clearly indicates that it refers to free models.
     * @default "free-models"
     */
    alias?: string;
    /**
     * The plugin will check these providers in order for free models, and use the first one that has a free model available.
     * Please note that most providers will require extra setup to access their free models, such as creating an account and generating an API key.
     * @default ["opencode"] Defaults to only checking for free models from the OpenCode provider, which are available to all users without any setup.
     */
    providers?: string[];
    /**
     * A fallback model to use when no free model is available.
     * This should be a model that the user has access to, but is not necessarily free.
     * The plugin will attempt to use free models first, and only fall back to this model if no free models are available.
     */
    fallbackModel?: string;
}

interface ModelsDevData {
    [key: string]: {
        models: Record<string, {
            id: string;
            name: string;
            status: string;
        }>;
    }
}

const fetchFreeModels = async (providers: string[]): Promise<string[]> => {
    const resp = await fetch(`https://models.dev/api.json`);
    const jsonConfig = await resp.json() as ModelsDevData ?? {};

    const pickedByProviders = Object.fromEntries(providers.map(provider => [provider, jsonConfig[provider]]));
    const filteredModels = Object.entries(pickedByProviders).flatMap(([provider, data]) => {
        if (!data) {
            console.warn(`Provider "${provider}" not found in models.dev data.`);
            return [];
        }
        return Object.values(data.models)
            .filter(model => model.status !== "deprecated" && model.id.endsWith("free"))
            .map(model => `${provider}/${model.id}`);
    });
    return filteredModels;
}

export const OpenCodeFreeModelsPlugin: Plugin = async ({ project, client, $, directory, worktree }, options?: PluginOptions) => {
    const {
        providers = ["opencode"],
        alias = "free-models",
        fallbackModel,
    } = (options || {}) as OpenCodeFreeModelsPluginOptions;

    return {
        'config': async (config: Config) => {
            let resolvedModel: string | undefined = fallbackModel;
            const resoleAlias = (model?: string) => model === alias ? resolvedModel : model;
            try {
                const freeModels = await fetchFreeModels(providers);
                if (freeModels.length > 0) {
                    resolvedModel = freeModels[0]!;
                }
            } catch (error) {
                console.error("Failed to fetch free models, falling back to default model:", error);
            }

            config.model = resoleAlias(config.model);

            if (config.agent) {
                for (const [name, agentConfig] of Object.entries(config.agent)) {
                    if (agentConfig?.model) {
                        agentConfig.model = resoleAlias(agentConfig.model);
                    }
                }
            }

            if (config.command) {
                for (const [name, commandConfig] of Object.entries(config.command)) {
                    if (commandConfig?.model) {
                        commandConfig.model = resoleAlias(commandConfig.model);
                    }
                }
            }
        },
    }
}
