# Sacramento State Career Center Volunteer System

<!-- TODO: Add more sections -->

## Features

[TODO]

## Contributing

* **Use clear commit messages**
  * Follow the [conventional commit style](https://www.conventionalcommits.org/en/v1.0.0/):
    * `feat:` - new feature
    * `fix:` - bug fix
    * `docs:` - documentation update
    * `refactor:` - code restructuring
    * `chore:` - internal, non-user-facing changes
    * `ci:` - changes to CI/CD pipeline
    * `style:` - formatting to comply to style guidelines

* **Use the branches correctly**
  * `dev` - Commit here, merge into `staging`
    * Critical bug fixes can be directly merged with `prod`, use good judgment to decide on what defines "critical"
  * `staging` - Review commits ready to merge with `prod`
  * `prod` - Production branch
    * **DO NOT DIRECTLY COMMIT TO** `prod`

## Setup

1. Install both python and nodejs
2. Run:

```bash
source setup-dev
```

## License

GPL-3.0-or-later
