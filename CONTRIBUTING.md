# Contributing to City_Hive

Thanks for your interest in improving City_Hive! This project is maintained by members of the NY Bee Club (pres.qns@nybeeclub.org) and welcomes community contributions.

## Reporting Issues

- Open an issue on GitHub for bugs or feature requests.
- Include as much detail as possible: browser version, steps to reproduce and screenshots if relevant.
- For any UI issues, attach a screenshot.

## Pull Requests

1. Fork the repository and create a feature branch.
2. Run `black` on Python files and open `docs/index.html` to verify the map works.
3. Follow our coding style:
   - Python files use [black](https://black.readthedocs.io/) formatting and 4‑space indentation.
   - JavaScript files use 2‑space indentation and should pass `prettier` if installed.
4. Write clear commit messages and reference related issues when possible.
5. Update documentation (README, Roadmap, screenshots, etc.) when your change affects them.
6. Submit a pull request and wait for review by the maintainers.

There are currently no automated tests, so please test your changes manually:

```bash
# serve the static site
python -m http.server
# open http://localhost:8000/docs/index.html
```

Run any modified Python scripts to ensure they still execute without errors.

## Questions

Feel free to open an issue or contact the maintainers via the NY Bee Club (pres.qns@nybeeclub.org).
