---
{
  "title": "How to implement a text field with multiple values in MUI",
  "draft": false,
  "created_at": "2024-3-20",
  "category": "Frontend",
  "tags": ["React", "MUI", "Tailwind CSS"],
  "description": "This article teaches you how to implement a text field in React MUI that can accespt multiple values",
  "image": "https://github.com/shuaiqifeiyang/FrontendDemos/blob/main/multi-input/multi-input.png?raw=true"
}
---

![](https://github.com/shuaiqifeiyang/FrontendDemos/blob/main/multi-input/multi-input.png?raw=true)

## Key Points

There is an attribute called **startAdornment** in the InputProps, where we can add a component within the TextField. Meanwhile, we also need to customize the style within the TextField.

## Code

You can download the project from my [Github](). This project is the folder **multi-input**

```jsx
function App() {
  const [values, setValues] = useState([]);
  const [value, setValue] = useState("");
  console.log(values);
  const handleEnter = (e) => {
    if (e.key === "Enter" && value !== "" && !values.includes(value)) {
      setValues([...values, value]);
      setValue("");
    }
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleValueDelete = (item) => {
    setValues(values.filter((v) => v !== item));
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="w-72">
        <TextField
          label="Values"
          size="small"
          fullWidth
          onKeyUp={handleEnter}
          value={value}
          onChange={handleValueChange}
          InputProps={{
            // add component showing inputed values
            startAdornment:
              values.length === 0 ? null : (
                <div className="flex pt-3 gap-x-2">
                  {values.map((v) => {
                    return (
                      <Chip
                        key={v}
                        label={v}
                        variant="outlined"
                        onDelete={() => {
                          handleValueDelete(v);
                        }}
                      />
                    );
                  })}
                </div>
              ),
            // customize the style within the TextField
            style: 
              values.length === 0
                ? {}
                : {
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gridTemplateRows: "1fr 38px",
                  },
          }}
        />
      </div>
    </div>
  );
}
```

