---
{
  "title": "Error Handling and Logging in Go",
  "draft": false,
  "created_at": "2024-12-02",
  "category": "Language",
  "tags": ["Go"],
  "description": "Error Handling and Logging is very crucial for a operational software, let's dive deep in how Go language handle error and log error"
}
---

It's unavoidable to see some errors in production environments even though every programmer tries their best to eliminate bugs. Every human makes mistakes, what is important is we should have solution to monitor and track error. Error handling and logging is an area we should pay attention to. If we place sophisticated error handling and logging logic in our code, we can locate and fix error fast when we detect it.

## Error in Go

While other languages move error handling out of the code flow, Go considers errors a natural part of the program flow. If a function encounters an error, it returns that error alongside other return values. The caller has the duty to check this error and handle it accordingly.

The error type is a built-in interface

```go
type error interface {
    Error() string
}
```

> In Go (Golang), an **interface** is a type that specifies a set of method signatures. It defines behavior by declaring a collection of method prototypes, and any type that implements those methods satisfies the interface.

#### Return an error

```go
return errors.New("error message")
```

#### Define a custom error

```go
type CustomError struct {
	Message    string
}

func (e *CustomError) Error() string {
	return e.Message
}
```

#### Include stacktrace info

```go
import "runtime/debug"
string(debug.Stack())
```

#### Wrap an error

```go
fmt.Errorf("read failed: %w", err)
errors.Wrap(err, "open failed")
```

#### Unwrap an error

```go
errors.Unwrap(err) // return the nested err
// you can unwrap one error after another until
// you hit the end of the chain.
```

#### Testing for Specific Error Types

```go
errors.Is(err, target_error)
// errors.Is returns true if err is or wraps target.

func As(err error, target interface{}) bool
// err: The error you want to check.
// target: A pointer to a variable where the error will be stored if
// it matches the type.
```

#### Joined Errors

```go
var errs error
errs = errors.Join(errs, fmt.Errorf("reading %s failed: %w", path, err))

// unwrap joined errors
e, ok := err.(interface{ Unwrap() []error })
if ok {
    log.Println("e.Unwrap() = ", e.Unwrap())
}
```

## Logging in Go

Slog was released in Go V1.21. 

Three main types in `log/slog`

- `Logger`: the logging "frontend" which provides level methods such as (`Info()` and `Error()`) for recording events of interest.
- `Record`: a representation of each self-contained log object created by a `Logger`.
- `Handler`: an interface that, once implemented, determines the formatting and destination of each `Record`. Two built-in handlers are included in the `log/slog` package: `TextHandler` and `JSONHandler` for `key=value` and JSON output respectively.

#### Customizing the default logger

```go
func main() {
    logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
    slog.SetDefault(logger) // replace the default logger
    slog.Info("Info message")
}
//Using the SetDefault() method also alters the default log.Logger
//employed by the log package. This behavior allows existing
//applications that utilize the older log package to transition to
//structured logging seamlessly

// The slog.NewLogLogger() method is also available for converting an
// slog.Logger to a log.Logger when you need to utilize APIs that
// require the latter
```

#### Output key value pairs

```go
// solution 1: It may cause unbalanced key/value pairs
logger.Info(
  "incoming request",
  "method", "GET",
  "time_taken_ms", 158,
  "path", "/hello/world?q=search",
  "status", 200,
  "user_agent", "Googlebot/2.1 (+http://www.google.com/bot.html)",
)

// solution 2: strongly-typed contextual attributes
logger.Info(
  "incoming request",
  slog.String("method", "GET"),
  slog.Int("time_taken_ms", 158),
  slog.String("path", "/hello/world?q=search"),
  slog.Int("status", 200),
  slog.String(
    "user_agent",
    "Googlebot/2.1 (+http://www.google.com/bot.html)",
  ),
)
// strongly-typed and loosely-typed can be mixed
logger.Info(
  "incoming request",
  "method", "GET",
  slog.Int("time_taken_ms", 158),
  slog.String("path", "/hello/world?q=search"),
  "status", 200,
  slog.String(
    "user_agent",
    "Googlebot/2.1 (+http://www.google.com/bot.html)",
  ),
)

// solution 3: LogAttrs() method. This method is impossible to have
// have an unbalanced key/value pair
logger.LogAttrs(
  context.Background(),
  slog.LevelInfo,
  "incoming request",
  slog.String("method", "GET"),
  slog.Int("time_taken_ms", 158),
  slog.String("path", "/hello/world?q=search"),
  slog.Int("status", 200),
  slog.String(
    "user_agent",
    "Googlebot/2.1 (+http://www.google.com/bot.html)",
  ),
)

// Nested JSON
logger.Info(
  "image uploaded",
  slog.Int("id", 23123),
  slog.Group("properties",
    slog.Int("width", 4000),
    slog.Int("height", 3000),
    slog.String("format", "jpeg"),
  ),
)

```

#### Child loggers

Child loggers can include additional fields for all output.

```go
func main() {
    handler := slog.NewJSONHandler(os.Stdout, nil)
    buildInfo, _ := debug.ReadBuildInfo()

    logger := slog.New(handler)

    child := logger.With(
        slog.Group("program_info",
            slog.Int("pid", os.Getpid()),
            slog.String("go_version", buildInfo.GoVersion),
        ),
    )
    child.Info("image upload successful", slog.String("image_id", "39ud88"))
    child.Warn(
        "storage is 90% full",
        slog.String("available_space", "900.1 mb"),
    )
}

```

#### Slog Levels

The `log/slog` package provides four log levels by default, with each one associated with an integer value: `DEBUG` (-4), `INFO` (0), `WARN` (4), and `ERROR` (8).

```go
opts := &slog.HandlerOptions{
    Level: slog.LevelDebug,
}

handler := slog.NewJSONHandler(os.Stdout, opts)
```

Reference:
https://www.jetbrains.com/guide/go/tutorials/handle_errors_in_go/introduction/

https://betterstack.com/community/guides/logging/logging-in-go/
