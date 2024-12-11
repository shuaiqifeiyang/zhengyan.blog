---
{
  "title": "OO in different language",
  "draft": true,
  "created_at": "2024-12-02",
  "category": "Language",
  "tags": ["Python", "cpp", "JavaScript", "Go"],
  "description": "Error Handling and Logging is very crucial for a operational software, let's dive deep in how different language handle error and log error"
}
---



## Go

Go doesn't have classes. However, you can define methods on types.

A method is just a function with a receiver argument.

```go
type Vertex struct {
	X, Y float64
}

func Abs(v Vertex) float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(Abs(v))
}

```

You can declare a method on non-struct types, too.

```go
type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func main() {
	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs())
}

```

Methods with pointer receivers can modify the value to which the receiver points

```go
type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}
```

Functions with a pointer argument must take a pointer while methods with pointer receivers take either a value or a pointer as the receiver when they are called.

Go automatically interprets v.Scale(5) to (&v).Scale(5) since the Scale method has a pointer receiver.

The equivalent thing happens in the reverse direction.

Functions that take a value argument must take a value of that specific type While methods with value receivers take either a value or a pointer as the receiver when they are called:

All methods on a given type should have either value or pointer receivers, but not a mixture of both.



# Interface

An *interface type* is defined as a set of method signatures.

A value of interface type can hold any value that implements those methods.

A type implements an interface by implementing its methods. There is no explicit declaration of intent, no "implements" keyword.

Implicit interfaces decouple the definition of an interface from its implementation, which could then appear in any package without prearrangement.