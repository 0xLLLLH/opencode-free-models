# OpenCode Plugin Documentation

## Introduction

The OpenCode Free Models Plugin dynamically resolves the latest non-deprecated free models from various providers and integrates them into your OpenCode configuration. This plugin automatically fetches available free models and makes them available in your OpenCode environment.

## Installation

### Prerequisites
- OpenCode installed and configured
- Internet access to fetch model data from models.dev

### Installation Steps

1. Install the plugin via OpenCode's plugin system
2. Add the plugin to your OpenCode configuration file

## Configuration Options

### `alias`
- **Type:** `string`
- **Default:** `"free-models"`
- **Description:** The alias to use for free models. This can be any string, but should be something that clearly indicates that it refers to free models.

### `providers`
- **Type:** `string[]`
- **Default:** `["opencode"]`
- **Description:** The plugin will check these providers in order for free models, and use the first one that has a free model available. Please note that most providers will require extra setup to access their free models, such as creating an account and generating an API key.

### `fallbackModel`
- **Type:** `string`
- **Default:** `undefined`
- **Description:** A fallback model to use when no free model is available. This should be a model that the user has access to, but is not necessarily free. The plugin will attempt to use free models first, and only fall back to this model if no free models are available.

## Usage Examples

### Basic Configuration
```yaml
plugins:
  - name: "opencode-free-models"
    options:
      providers: ["opencode"]
```

### Custom Alias
```yaml
plugins:
  - name: "opencode-free-models"
    options:
      alias: "my-free-models"
      providers: ["opencode"]
```

### Multiple Providers
```yaml
plugins:
  - name: "opencode-free-models"
    options:
      providers: ["opencode", "openrouter"]
      fallbackModel: "openrouter/free"
```

## How It Works

1. **Model Fetching:** The plugin fetches available models from the models.dev API
2. **Filtering:** It filters models to find free models from the specified providers
3. **Resolution:** The first available free model is selected
4. **Fallback:** If no free models are found, the fallback model is used
5. **Configuration Update:** The resolved model is applied to your OpenCode configuration

## Error Handling

- If the models.dev API is unreachable, the plugin will use the fallback model
- If a specified provider is not found in the models.dev data, it will be skipped
- If no free models are available from any provider, the fallback model is used
