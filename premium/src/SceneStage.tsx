import { Component, lazy, Suspense, useEffect, useState, type ErrorInfo, type ReactNode } from "react";

const ProductCanvas = lazy(() => import("./ProductCanvas"));

type SceneStageProps = {
  accent: string;
  reduceMotion: boolean;
};

type BoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type BoundaryState = {
  hasError: boolean;
};

class SceneErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("3D sahne başlatılamadı", error, info);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function StatusMessage({ children, tone = "loading" }: { children: ReactNode; tone?: "loading" | "error" }) {
  return (
    <div className={`scene-status scene-status--${tone}`} role={tone === "error" ? "alert" : "status"}>
      <span aria-hidden="true" />
      {children}
    </div>
  );
}

export default function SceneStage({ accent, reduceMotion }: SceneStageProps) {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const testCanvas = document.createElement("canvas");
      setWebglAvailable(Boolean(testCanvas.getContext("webgl2") || testCanvas.getContext("webgl")));
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  const errorFallback = (
    <StatusMessage tone="error">3D görünüm açılamadı. Optimize edilmiş statik ürün görseli gösteriliyor.</StatusMessage>
  );

  return (
    <div className="scene-stage" style={{ "--scene-accent": accent } as React.CSSProperties}>
      <img
        className="scene-fallback"
        src="/images/nexus-edge-hero.jpg"
        alt="Kurgusal NEXUS·01 endüstriyel sensör konseptinin stüdyo görseli"
        width="1672"
        height="941"
        decoding="async"
        fetchPriority="high"
      />
      {webglAvailable === false ? (
        errorFallback
      ) : webglAvailable === true ? (
        <SceneErrorBoundary fallback={errorFallback}>
          <Suspense fallback={<StatusMessage>3D ürün sahnesi hazırlanıyor…</StatusMessage>}>
            <ProductCanvas accent={accent} reduceMotion={reduceMotion} />
          </Suspense>
        </SceneErrorBoundary>
      ) : (
        <StatusMessage>Grafik desteği kontrol ediliyor…</StatusMessage>
      )}
      <div className="scene-badge">
        <span /> Geometrik WebGL demosu
      </div>
      <div className="scene-hint" aria-hidden="true">Sürükle · incele</div>
    </div>
  );
}
