---
{
  "title": "Relearn C++ 01: Variables and Basic Types",
  "draft": false,
  "created_at": "2026-01-18",
  "category": "Language",
  "tags": ["C++"],
  "description": "Variables and Basic Types"
}
---

## 1. Build-in Types

1. The standard defines minimum widths rather than fixed sizes for types, and the standard gurantees the order of size.

| Type          | Meaning                           | Minimum Size          |
| ------------- | --------------------------------- | --------------------- |
| `bool`        | boolean                           | NA                    |
| `char`        | character                         | 8 bits                |
| `wchar_t`     | wide character                    | 16 bits               |
| `char16_t`    | Unicode character                 | 16 bits               |
| `char32_t`    | Unicode character                 | 32 bits               |
| `short`       | short integer                     | 16 bits               |
| `int`         | integer                           | 16 bits               |
| `long`        | long integer                      | 32 bits               |
| `long long`   | long integer                      | 64 bits               |
| `float`       | single-precision floating-point   | 6 significant digits  |
| `double`      | double-precision floating-point   | 10 significant digits |
| `long double` | extended-precision floating-point | 10 significant digits |

- **Integral Types**: `char` <= `short` <= `int` <= `long` <= `long long`.
- **Floating-Point Types**: `float` <= `double` <= `long double`.

2. If we assign an out-of-range value to an object of signed type, the result is
   undefined. The program might appear to work, it might crash, or it might produce garbage values.

```cpp
signed chat c2 = 256;
```

```cpp
unsigned u = 10, u2 = 42
std::cout << u - u2 << std::endl; // -32 + 2^32
```

3. Literals

20 /_ decimal \*/  
024 /_ octal \*/  
0x14 /\* hexadecimal \*/

We can also write a generalized escape sequence, which is \x followed by one or
more hexadecimal digits or a \ followed by one, two, or three octal digits. The
value represents the numerical value of the character. Some examples (assuming
the Latin-1 character set):
\7 (bell)  
\12 (newline)  
\40 (blank)  
\0 (null)  
\115 (’M’)  
\x4d (’M’)

- `'a'`: `char`
- `L'a'`: `wchar_t`
- `"a"`: `string literal` (array of `const char`)
- `L"a"`: `wide string literal` (array of `const wchar_t`)

- `10`: `int`
- `10u`: `unsigned int`
- `10L`: `long`
- `10uL`: `unsigned long`
- `012`: `int` (octal)
- `0xC`: `int` (hexadecimal)

- `3.14`: `double`
- `3.14f`: `float`
- `3.14L`: `long double`

- `10`: `int`
- `10u`: `unsigned int`
- `10.`: `double`
- `10e-2`: `double`

## 2. Variables

1. Modern engineering standards mandate the use of braced initialization (or list initialization) where potential data loss might occur, ensuring that the compiler flags these narrowing conversions as errors.

```cpp
long double ld = 3.1415926536;
int a{ld}, b = {ld}; // error: narrowing conversion required
```

## 3. Compound Types

1. There is no way to rebind a reference to refer to a different object. Because there is no way to rebind a reference, references must be initialized.

2. NULL vs std::nullptr

- **Nature**: `NULL` is a **macro** (typically defined as `0` or `(void*)0`), while `nullptr` is a C++ **keyword** (a pointer literal).
- **Type Safety**: `NULL` is an **integer** type, which can cause ambiguity in function overloading. `nullptr` has its own type `std::nullptr_t` and can only be implicitly converted to **pointer types**.
- **Ambiguity Example**:
- `func(NULL)` might call `func(int)`.
- `func(nullptr)` will correctly call `func(void*)`.
- **Always use `nullptr**`: In modern C++ (C++11 and later), `nullptr` is the gold standard. It makes your code safer and more readable.
- **Avoid `NULL` and `0**`: Stop using `NULL`or literal`0` for pointers to prevent silent type-conversion bugs.
- **Legacy Code**: Only use `NULL` if you are working on a legacy C project or using a compiler older than 2011.

3. void\*

- Holds any address
- Must be cast and cannot be dereferenced directly
- Mainly used for memory management: handling raw buffers of bytes.
- In modern C++, avoid void\* whenever possible. Use templates, std::any, or std::variant for better type safety.

4. In standard C++, there is no built-in mechanism to check if a pointer is "valid" (i.e., pointing to an object that currently exists in memory). To avoid this problem, always initialize pointers to nullptr and set them back to nullptr immediately after the object they point to is destroyed.

5. It is a common misconception to think that the type modifier (\*or &) applies to all the variables defined in a single statement.

```cpp
// i is an int; pis a pointer to int; ris a reference to int
int i = 1024, *p = &i, &r = i;
```

6. It can be easier to understand complicated pointer or reference declarations if you read them from right to left.

```cpp
int i = 42;
int *p; // pis a pointer to int
int *&r = p; // ris a reference to the pointer p
r = &i; // rrefers to a pointer; assigning &ito rmakes ppoint to i
*r = 0; // dereferencing ryields i, the object to which ppoints; changes ito 0
```

## 4. Const Qualifier

1. We can initialize a reference to constfrom any expression that can be converted

```cpp
double dval = 3.14;
const int &ri = dval;
// Legal, but change ri won't change dval. ri binds to a temporary
```

2. const pointers

- Pointer to const: const double \*ptr = \&pi; Characteristics: You cannot modify the value of the object being pointed to through the pointer, but the pointer itself can be changed to point elsewhere.
- const Pointer: int \*const p = \&i; Characteristics: The pointer itself is a constant; once it points to a specific address, it cannot be changed. However, you can modify the value of the object it points to (provided the object itself is not a const).

3. int &r = 0; is illegal because a non-const reference cannot be bound to a literal
   int i, \*const cp; is illegal because all const pointers must be initialized with an address upon declaration.

4. A constexpr variable is treated as a constant expression when used to initialize a pointer.

```cpp
constexpr int null = 0, *p = null; //legal
```

## 5. Dealing with Types

1. tepydef: When using a pointer alias with const, the const applies to the pointer (making it a constant pointer), not the base type.

2. auto: When an initializer is a reference, auto uses the type of the object the reference refers to, not the reference type itself.

3. decltype
    - Exact Match: Unlike auto, decltype preserves both top-level consts and references exactly as they are declared.

    - Lvalue vs. Rvalue: If the expression is an lvalue (something that can be on the left side of an assignment), decltype returns a reference type.

    - Double Parentheses: decltype((variable)) is always a reference, while decltype(variable) is only a reference if the variable was originally declared as one.
