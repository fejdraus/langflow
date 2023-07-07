import { useContext, useEffect, useState } from "react";
import { PopUpContext } from "../../contexts/popUpContext";
import CodeAreaModal from "../../modals/codeAreaModal/v2";
import { CodeAreaComponentType } from "../../types/components";

import { ExternalLink } from "lucide-react";

export default function CodeAreaComponent({
  value,
  onChange,
  disabled,
  editNode = false,
  nodeClass,
  setNodeClass,
  dynamic,
}: CodeAreaComponentType) {
  const [myValue, setMyValue] = useState(value);
  const { openPopUp } = useContext(PopUpContext);
  useEffect(() => {
    if (disabled) {
      setMyValue("");
      onChange("");
    }
  }, [disabled, onChange]);

  useEffect(() => {
    setMyValue(typeof value == "string" ? value : JSON.stringify(value));
  }, [value]);

  return (
    <div
      className={
        disabled ? "pointer-events-none w-full cursor-not-allowed" : "w-full"
      }
    >
      <div className="flex w-full items-center">
        <span
          onClick={() => {
            openPopUp(
              <CodeAreaModal
                dynamic={dynamic}
                value={myValue}
                nodeClass={nodeClass}
                setNodeClass={setNodeClass}
                setValue={(t: string) => {
                  setMyValue(t);
                  onChange(t);
                }}
              />
            );
          }}
          className={
            editNode
              ? "input-edit-node input-dialog "
              : "input-dialog input-primary " +
                (disabled ? "input-disable" : "")
          }
        >
          {myValue !== "" ? myValue : "Type something..."}
        </span>
        <button
          onClick={() => {
            openPopUp(
              <CodeAreaModal
                key={myValue}
                dynamic={dynamic}
                setNodeClass={setNodeClass}
                value={myValue}
                nodeClass={nodeClass}
                setValue={(t: string) => {
                  setMyValue(t);
                  onChange(t);
                }}
              />
            );
          }}
        >
          {!editNode && (
            <ExternalLink
              strokeWidth={1.5}
              className="ml-3 h-6 w-6  hover:text-accent-foreground"
            />
          )}
        </button>
      </div>
    </div>
  );
}
