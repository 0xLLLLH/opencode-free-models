# opencode-free-models

A project that provides two ways to resolve free models for OpenCode:

1. **OpenCode Plugin** - Dynamically fetches free models within OpenCode
2. **GitHub Action** - Resolves free models for CI/CD pipelines

## Quick Start

### For OpenCode Plugin
```yaml
plugins:
  - name: "opencode-free-models"
    options:
      providers: ["opencode"]
```

### For GitHub Action
```yaml
- uses: 0xLLLLH/opencode-free-models@main
  with:
    providers: "opencode"
    fallback: "openrouter/free"
```

## Choose Your Method

**Key Difference:** GitHub Actions cannot use OpenCode plugins.

| Feature | OpenCode Plugin | GitHub Action |
|---------|----------------|---------------|
| Environment | OpenCode | GitHub Actions |
| Configuration | OpenCode config file | YAML inputs |
| Dynamic resolution | Yes | Yes |
| Fallback support | Yes | Yes |

### When to Use Each Method

- **Use Plugin:** When working within OpenCode environment
- **Use GitHub Action:** When in CI/CD pipelines or need model resolution outside OpenCode

## Installation

### OpenCode Plugin
1. Install via OpenCode plugin system
2. Add to your OpenCode configuration

### GitHub Action
1. Add to your GitHub Actions workflow
2. Configure input parameters

## Configuration Options

### OpenCode Plugin Options
- `alias`: Custom alias for free models (default: "free-models")
- `providers`: List of providers to check (default: ["opencode"])
- `fallbackModel`: Fallback model when no free models available

### GitHub Action Inputs
- `providers`: Comma-separated provider list (default: "opencode")
- `fallback`: Fallback model ID (default: "openrouter/free")

### GitHub Action Outputs
- `model_id`: Resolved model ID

## Usage Examples

### OpenCode Plugin Example
```yaml
plugins:
  - name: "opencode-free-models"
    options:
      providers: ["opencode"]
      alias: "free-models"
```

### GitHub Action Example
```yaml
- uses: 0xLLLLH/opencode-free-models@main
  with:
    providers: "opencode"
    fallback: "openrouter/free"
```

## Related Documentation

- [OpenCode Plugin Documentation](docs/opencode-plugin.md) - Detailed plugin documentation
- [GitHub Action Documentation](docs/github-action.md) - Detailed action documentation
- [models.dev API](https://models.dev/api.json) - Model data source

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
