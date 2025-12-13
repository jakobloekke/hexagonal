{ pkgs }:
pkgs.mkShell {
  name = "secondgen-dev";
  
  buildInputs = with pkgs; [
    # Node.js 20 with npm
    nodejs-20_x
    
    # pnpm for JavaScript/TypeScript package management
    nodePackages.pnpm
    
    # Python 3.11 for backend
    python311
    
    # uv for Python package management
    uv
    
    # Git (usually pre-installed, but ensuring availability)
    git
    
    # Common utilities
    curl
    wget
  ];
  
  shellHook = ''
    echo "SecondGen monorepo environment loaded!"
    echo "Node version: $(node --version)"
    echo "pnpm version: $(pnpm --version)"
    echo "Python version: $(python3 --version)"
    echo "uv version: $(uv --version)"
  '';
}

