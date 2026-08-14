import { Command } from 'commander';

export function registerCompletionsCommand(program: Command): void {
  program
    .command('completions <shell>')
    .description('Generate shell autocompletion script (bash, zsh, fish)')
    .action((shell: string) => {
      const commands = [
        'login',
        'logout',
        'whoami',
        'ls',
        'new',
        'open',
        'shell',
        'exec',
        'clone',
        'pull',
        'push',
        'run',
        'restart',
        'secrets',
        'db',
        'env',
        'rename',
        'delete',
        'import',
        'config',
        'ask',
        'agent',
      ].join(' ');

      if (shell === 'bash') {
        console.log(`
_rsh_completions() {
    local cur prev opts
    COMPREPLY=()
    cur="\${COMP_WORDS[COMP_CWORD]}"
    prev="\${COMP_WORDS[COMP_CWORD-1]}"
    opts="${commands}"

    if [[ \${COMP_CWORD} -eq 1 ]] ; then
        COMPREPLY=( $(compgen -W "\${opts}" -- \${cur}) )
        return 0
    fi
}
complete -F _rsh_completions rsh
`);
      } else if (shell === 'zsh') {
        console.log(`
#compdef rsh
_rsh() {
    local -a commands
    commands=(${commands.split(' ').map((c) => `'${c}'`).join(' ')})
    _describe 'rsh commands' commands
}
compdef _rsh rsh
`);
      } else if (shell === 'fish') {
        console.log(`
complete -c rsh -f -a "${commands}"
`);
      } else {
        console.error(`Unsupported shell: ${shell}. Supported shells: bash, zsh, fish.`);
      }
    });
}
