echo "=== OS & Kernel ==="
uname -a
cat /etc/os-release | grep -E "PRETTY_NAME|VERSION"

echo "=== Runtimes & Compilers ==="
which python3 python node bun denio gcc g++ clang rustc go cargo zig java javac dotnet 2>&1
python3 --version 2>&1
node --version 2>&1
bun --version 2>&1
gcc --version | head -n 1 2>&1
rustc --version 2>&1
go version 2>&1

echo "=== Databases & Services ==="
which psql sqlite3 redis-cli valkey-cli mongosh 2>&1
sqlite3 --version 2>&1

echo "=== Tools & Security ==="
which git gh docker semgrep osv-scanner ffmpeg convert sharp nix tesseract 2>&1

echo "=== Python Libraries ==="
python3 -c "
libs = ['torch', 'transformers', 'mcp', 'pydantic', 'fastapi', 'playwright', 'z3', 'sympy', 'numpy', 'scipy', 'networkx', 'httpx', 'aiohttp', 'sqlite3', 'duckdb']
for lib in libs:
    try:
        __import__(lib)
        print(f'  {lib}: available')
    except ImportError:
        print(f'  {lib}: NOT available')
"

echo "=== Node / Bun Libraries ==="
node -e "
const libs = ['@modelcontextprotocol/sdk', 'playwright', 'typescript', 'express', 'zod'];
libs.forEach(l => {
  try { require(l); console.log('  ' + l + ': available'); }
  catch(e) { console.log('  ' + l + ': NOT available'); }
});
"
