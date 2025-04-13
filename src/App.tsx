import { SequenceConnect } from "@0xsequence/connect";
import { config } from "./config";

import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { NotConnected } from "./views/NotConnected";
import { Connected } from "./views/Connected";
import { Select, SequenceBoilerplate } from "boilerplate-design-system";
import View3D from "./components/3d/View3D";
import ItemViewer3D from "./components/3d/ItemViewer3D";
import DynamicItem from "./components/3d/DynamicItem";
import { useLocalStorage } from "@uidotdev/usehooks";

import { modelsList } from "./modelsList";
export default function Layout() {
  return (
    <SequenceConnect config={config}>
      <App />
    </SequenceConnect>
  );
}

function App() {
  const { isConnected } = useAccount();
  const [modelName, setModelName] = useLocalStorage("modelName", "chest.glb");
  return (
    <SequenceBoilerplate
      githubUrl="https://github.com/0xsequence-demos/demo-adventure-assets"
      name="Demo Adventure Assets"
      description="Embedded Wallet"
      wagmi={{ useAccount, useDisconnect, useSwitchChain }}
    >
      <Select
        defaultValue={modelName}
        options={modelsList}
        onValueChange={(opt) => setModelName(opt)}
      ></Select>
      <View3D>
        <ItemViewer3D>
          <DynamicItem gltfUrl={`/${modelName}`} />
        </ItemViewer3D>
      </View3D>
      {isConnected ? <Connected /> : <NotConnected />}
    </SequenceBoilerplate>
  );
}
