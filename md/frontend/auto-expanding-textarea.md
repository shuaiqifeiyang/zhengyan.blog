---
{
  "title": "Auto-Expanding Textarea",
  "draft": false,
  "created_at": "2024-06-17",
  "category": "Frontend",
  "tags": ["CSS", "React"],
  "description": "How to implement an auto-expanding textarea"
}
---

## Recipe

Every time user input text changes:

* initially sets the height of the textarea to `MIN_HEIGHT`
* then sets the height based on the scroll height of the textarea to ensure that the textarea grows with the content
* If the scroll height exceeds `MAX_HEIGHT` pixels, it sets the height of the textarea to `MAX_HEIGHT` pixels

## Code

JSX:

```js
import "./App.css";
import { useState, useRef, useEffect } from "react";

const MIN_HEIGHT = 33;
const MAX_HEIGHT = 100;

function App() {
  const [inputText, setInputText] = useState("");
  const textareaRef = useRef(null);
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  useEffect(() => {
    const textarea = textareaRef.current;
    console.log(textarea);
    textarea.style.height = `${MIN_HEIGHT}px`;
    textarea.style.height = textareaRef.current.scrollHeight + "px";
    if (textareaRef.current.scrollHeight > 99) {
      textarea.style.height = `${MAX_HEIGHT}px`;
    }
  }, [inputText]);

  return (
    <>
      <textarea
        className="home-container__textarea"
        value={inputText}
        onChange={handleInputChange}
        ref={textareaRef}
      ></textarea>
    </>
  );
}

export default App;

```

CSS:
```css
.home-container__textarea {
  resize: none;
}
```

