# userscripts

@libraoly's userscripts.

- [Windy Premium Cleaner](https://github.com/libraoly/userscripts/releases/latest/download/windy-premium.user.js) - Remove Windy Premium watermark and grayscale filter.
- [FlightConnections Premium](https://github.com/libraoly/userscripts/releases/latest/download/flightconnections-premium.user.js) - Unlock premium features on flightconnections.com.

## Development

Scripts are authored in TypeScript and bundled with `tsdown`.

```bash
# Install dependencies
pnpm install

# Build all scripts
pnpm run build

# Watch mode
pnpm run dev
```

Releases are automatically created via GitHub Actions on push to `main`. Scripts are distributed as GitHub Release assets.

## Credits

This project is inspired by [sxzz/userscripts](https://github.com/sxzz/userscripts). Special thanks for the great work!

## License

[MIT](./LICENSE) License © 2026 [libraoly](https://github.com/libraoly)
