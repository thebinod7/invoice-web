---
name: commit-msg
description: Generate a conventional commit message from staged changes and commit them. Trigger when the user says "write a commit message", "generate a commit", "commit my changes", or runs /commit-msg.
---

# commit-msg

Generate a commit message from the currently staged diff and commit it.

## Steps

1. Run `git diff --staged` (and `git diff --staged --stat` for an overview if the diff is large).
   - If there are no staged changes, **stop** and tell the user to stage changes first (e.g. with `git add`). Do not proceed further.
2. Read through the staged diff to understand what actually changed and why (infer intent from the code, not just filenames).
3. Generate a commit message in this exact format:

   ```
   type(scope): short subject

   - bullet of what changed
   - bullet of why
   ```

   Rules:
   - `type` is one of: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`.
   - `scope` is a short identifier for the affected area (e.g. a directory, module, or feature name) — omit the `(scope)` parens only if no sensible scope exists.
   - `subject` is under 60 characters, imperative mood, no trailing period.
   - Body bullets are optional but encouraged: at least one "what changed" bullet and one "why" bullet when the reason isn't obvious from the subject alone. Keep bullets concise.
   - **Never** include a `Co-Authored-By` trailer or any other trailer.
4. Run `git commit -m "<message>"` using a heredoc so multi-line formatting is preserved, e.g.:

   ```bash
   git commit -m "$(cat <<'EOF'
   type(scope): short subject

   - bullet of what changed
   - bullet of why
   EOF
   )"
   ```

5. Confirm the commit succeeded (e.g. show `git log -1 --stat` or the commit output) and report the final message used.

## Notes

- Do not stage additional files yourself — only commit what is already staged.
- If staged changes span clearly unrelated concerns, still produce one commit for what's staged (don't split commits) unless the user asks you to split them.
- Do not add `--no-verify` or skip hooks.
