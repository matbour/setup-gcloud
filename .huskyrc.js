const tasks = commands => commands.join(' && ');

module.exports = {
  hooks: {
    'pre-commit': tasks(['npm run build', 'npm run format', 'git add dist/']),
  },
};
