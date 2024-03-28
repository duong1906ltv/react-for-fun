import { useState } from "react";
import { Dropdown, Input, Space } from "antd";
const { TextArea } = Input;
import { items } from "./utils/commands";

function App() {
  const [inputText, setInputText] = useState("");
  const [showCommands, setShowCommands] = useState(false);
  const [filterText, setFilterText] = useState("");

  const handleChange = (e) => [setInputText(e.target.value)];

  const handleKeyDown = (e) => {
    if (e.key === "@") {
      inputText.substring(inputText.length - 1) === "@"
        ? setShowCommands(false)
        : setShowCommands(true);
    } else if ([32, 77, 38, 39, 40].includes(e.keyCode)) {
      setFilterText("");
      setShowCommands(false);
    } else {
      inputText.substring(inputText.length - 1) === "@" && setFilterText(e.key);
      if (filterText !== "") {
        setFilterText(filterText + e.key);
      }
    }
  };

  const handleCommandClick = (e) => {
    if (filterText === "") {
      setInputText(inputText + items[e.key - 1].label);
    } else {
      setInputText(inputText - filterText + items[e.key - 1].label);
    }
    setShowCommands(false);
    setFilterText("");
  };

  const filterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <>
      <Dropdown
        menu={{
          items: items.filter((option) => filterOption(filterText, option)),
          onClick: handleCommandClick,
        }}
        placement="topLeft"
        open={showCommands}
      >
        <div>
          <TextArea
            rows={4}
            value={inputText}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
        </div>
      </Dropdown>
    </>
  );
}

export default App;
