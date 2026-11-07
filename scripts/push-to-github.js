import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs';
import path from 'path';

const dir = path.resolve('.');
const GITHUB_TOKEN = process.env.GH_TOKEN || process.argv[2];
const GITHUB_URL = 'https://github.com/codeforge99-crypto/Code-Forge.git';
const AUTHOR = { name: 'Code Forge', email: 'spcodeforge@gmail.com' };

async function main() {
  console.log('🔧 Initializing git repo...');
  await git.init({ fs, dir, defaultBranch: 'main' });

  console.log('📁 Staging all files...');
  await git.add({ fs, dir, filepath: '.' });

  // Check if there's anything to commit
  const status = await git.statusMatrix({ fs, dir });
  const changed = status.filter(([, head, workdir, stage]) => !(head === 1 && workdir === 1 && stage === 1));
  console.log(`📝 ${changed.length} files staged for commit.`);

  console.log('💾 Creating commit...');
  const sha = await git.commit({
    fs,
    dir,
    message: 'Initial commit — Code Forge website with Supabase backend',
    author: AUTHOR,
  });
  console.log('✅ Commit SHA:', sha);

  // Set remote (delete first if exists)
  console.log('🔗 Setting remote origin...');
  const remotes = await git.listRemotes({ fs, dir });
  if (remotes.find(r => r.remote === 'origin')) {
    await git.deleteRemote({ fs, dir, remote: 'origin' });
  }
  await git.addRemote({ fs, dir, remote: 'origin', url: GITHUB_URL });

  // Rename branch from master to main if needed
  const branches = await git.listBranches({ fs, dir });
  console.log('📋 Branches:', branches);
  if (branches.includes('master') && !branches.includes('main')) {
    console.log('🔄 Renaming master → main...');
    // Create main branch from master
    const masterSha = await git.resolveRef({ fs, dir, ref: 'master' });
    await git.writeRef({ fs, dir, ref: 'refs/heads/main', value: masterSha, force: true });
  }

  const currentBranch = branches.includes('main') ? 'main' : branches[0];
  console.log(`🚀 Pushing branch "${currentBranch}" to GitHub...`);
  const result = await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: currentBranch,
    remoteRef: 'main',
    onAuth: () => ({ username: 'codeforge99-crypto', password: GITHUB_TOKEN }),
    force: true,
    onProgress: (progress) => {
      if (progress.phase) console.log(`   ${progress.phase} ${progress.loaded || ''}/${progress.total || ''}`);
    },
  });

  console.log('\n✅ Successfully pushed to GitHub!');
  console.log('🌐 View your repo at: https://github.com/codeforge99-crypto/Code-Forge');
  console.log('Push result:', JSON.stringify(result, null, 2));
}

main().catch(err => {
  console.error('❌ Push failed:', err.message || err);
  process.exit(1);
});
