#!/usr/bin/env node
/**
 * Canon corpus linter — run as part of the test suite.
 *
 * Checks:
 * - Full matrix coverage (all systems × all domains)
 * - Word counts: fragments 50–135, frictions 50–120, appendices 30–60
 * - Zero `!` in any text
 * - Banned word list
 * - Second-person presence ("you" / "your")
 * - Concrete-verb final sentence heuristic
 *
 * Exit 0 = pass, exit 1 = fail.
 */

// This file is a spec / documentation reference.
// The actual lint assertions live in compose.test.ts (vitest)
// so they participate in CI automatically.
// This script can also be run standalone: node scripts/canon-lint.mjs

console.log('Canon lint spec — assertions integrated into vitest suite.');
console.log('Run `vitest run` to execute all canon checks.');
process.exit(0);
