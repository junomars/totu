module.exports = {
    branches: ['main'],
    repositoryUrl: 'https://github.com/junomars/totu',
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        '@semantic-release/git',
        [
            '@semantic-release/npm',
            {
                pkgRoot: process.env.PKG_ROOT || '.'
            }
        ]
    ],
    monorepo: {
        analyzeCommits: [
            {
                path: 'totuModel',
                releaseRules: [
                    { type: 'feat', release: 'minor' },
                    { type: 'fix', release: 'patch' }
                ]
            },
            {
                path: 'totuClient',
                releaseRules: [
                    { type: 'feat', release: 'minor' },
                    { type: 'fix', release: 'patch' }
                ]
            }
        ]
    }
};
