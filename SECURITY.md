# Security policy

*← [[README|README]] · [[00_MOC|Orchestration OS]].*

## Scope
This is a documentation and reference repository. It ships no running service. The main security concerns are: the example hook scripts (`hooks/*.js`), and making sure no contribution leaks a secret or personal data.

## Reporting a vulnerability or a leak
If you find a security issue in the example scripts, or you spot a secret, credential, or personal data that slipped into the repo, please report it privately rather than opening a public issue.

Contact the maintainer. <!-- Alex: add a private contact (email or GitHub security advisory) before publishing. -->

We will acknowledge the report, confirm the issue, and remove or fix it as quickly as we can. Thank you for the responsible disclosure.

## Using the hooks safely
The hooks are examples. Read them before wiring them into your own setup. They include a kill switch (`HOOKS_OFF=1`) and most fail open on internal error so they never brick your editing. The deploy gate is the one exception and fails closed by design. See [[hooks/README|README]].

*Created by Alex Villarroel · part of Orchestration OS.*
