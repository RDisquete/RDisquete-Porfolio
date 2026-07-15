import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#171717] text-[#cdc69c] px-6 py-20">
          <div className="max-w-md text-center">
            <p className="font-mono text-[10px] tracking-[0.5em] text-[#8e2b27] uppercase font-bold mb-4">
              // SIDE A - ERROR
            </p>
            <h1 className="text-7xl md:text-9xl font-black text-[#8e2b27] leading-none mb-6">
              ERROR
            </h1>
            <div className="w-16 h-1 bg-[#8e2b27] mx-auto mb-6" />
            <p className="font-mono text-sm text-[#cdc69c]/80 mb-8 leading-relaxed">
              Algo salio mal. El vinilo se ha atascado.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#8e2b27] text-white px-8 py-3 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-black transition"
            >
              REPRODUCIR DE NUEVO
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
