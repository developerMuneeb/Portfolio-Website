import { Component, lazy, Suspense, useEffect, useState } from "react";
import { canRender3D, loadWorld } from "../components/hero3d/support";

const World = lazy(loadWorld);

/** Any WebGL/runtime failure drops the site back to its 2D layout. */
class WorldBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFail();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Mounts the persistent 3D world on capable desktops and keeps
 * html.world-on in sync — that class switches sections into their
 * two-column "stage" layout so 3D never sits behind text.
 */
export default function WorldLoader() {
  const [on, setOn] = useState(canRender3D);

  useEffect(() => {
    document.documentElement.classList.toggle("world-on", on);
  }, [on]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 981px)");
    const update = () => setOn(canRender3D());
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!on) return null;
  return (
    <WorldBoundary onFail={() => setOn(false)}>
      <Suspense fallback={null}>
        <World />
      </Suspense>
    </WorldBoundary>
  );
}
