# GitHub Action Documentation

## Introduction

The Opencode Free Model Resolver GitHub Action dynamically resolves the latest non-deprecated free models for specified providers from models.dev. This action is designed for use in GitHub Actions workflows and CI/CD pipelines.

## Usage Method

### Basic Workflow Setup

Add the action to your GitHub Actions workflow:

```yaml
- name: Resolve Free Model
  id: resolve-model
  uses: 0xLLLLH/opencode-free-models@main
  with:
    providers: "opencode"
    fallback: "openrouter/free"
```

### Integration with Existing Workflows

You can use the resolved model ID in subsequent steps:

```yaml
- name: Use Resolved Model
  run: echo "Using model ${{ steps.resolve-model.outputs.model_id }}"
```

## Input Parameters

### `providers`
- **Description:** Comma-separated list of allowed providers
- **Required:** false
- **Default:** `"opencode"`
- **Example:** `"opencode,openrouter"`

### `fallback`
- **Description:** Fallback model ID when no free models are resolved
- **Required:** false
- **Default:** `"openrouter/free"`
- **Example:** `"openrouter/free"`

## Output Parameters

### `model_id`
- **Description:** The resolved final available model ID
- **Example:** `"opencode/deepseek-r1:free"`

## Usage Examples

### Basic Workflow
```yaml
name: Resolve Free Model
on: [push]

jobs:
  resolve-model:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      
      - name: Resolve Free Model
        id: resolve-model
        uses: 0xLLLLH/opencode-free-models@main
        with:
          providers: "opencode"
      
      - name: Use Resolved Model
        run: echo "Resolved model: ${{ steps.resolve-model.outputs.model_id }}"
```

### Multiple Providers
```yaml
- name: Resolve Free Model
  id: resolve-model
  uses: 0xLLLLH/opencode-free-models@main
  with:
    providers: "opencode,openrouter"
    fallback: "openrouter/free"
```

### Custom Fallback
```yaml
- name: Resolve Free Model
  id: resolve-model
  uses: 0xLLLLH/opencode-free-models@main
  with:
    providers: "opencode"
    fallback: "my-custom-model"
```

## How It Works

1. **API Fetching:** The action fetches model data from the models.dev API
2. **Provider Filtering:** It filters models to find free models from the specified providers
3. **Model Selection:** The first available free model is selected
4. **Fallback Logic:** If no free models are found, the fallback model is used
5. **Output:** The resolved model ID is set as an output for downstream steps

## Error Handling

- If the models.dev API is unreachable, the fallback model is used
- If a specified provider is not found in the models.dev data, it will be skipped
- If no free models are available from any provider, the fallback model is used
- The action has a 3-second timeout for API requests