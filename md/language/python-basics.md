---
{
  "title": "Python Basics for Leetcode",
  "draft": true,
  "created_at": "2024-07-09",
  "category": "Programming Language",
  "tags": ["Python"],
  "description": "Learn Python Quickly for Leetcode"
}
---

## Variables & Expression

```python
m, n = len(grid), len(grid[0])

topX = xCnt[i-1][j] if i > 0 else 0
```

## List

### Initialize an Array

```Python
xCnt = [[0] * n for _ in range(m)]
```

## Loop

In Python, you can iterate over various data structures using loops. The most common loops for iteration are `for` loops and `while` loops. Here are some examples:

### Using `for` Loop

1. **Iterating over a list:**
    
    ```python
    fruits = ['apple', 'banana', 'cherry']
    for fruit in fruits:
        print(fruit)
    ```
    
2. **Iterating over a dictionary:**
    ```python
    ages = {'Alice': 25, 'Bob': 30, 'Charlie': 35}
    for name, age in ages.items():
        print(f"{name} is {age} years old")
    ```

3. **Iterating over a range of numbers:**
    ```python
    for i in range(5):
        print(i)
    ```

### Using `while` Loop

1. **Basic `while` loop:**
    ```python
    count = 0
    while count < 5:
        print(count)
        count += 1
    ```

### Iterating with `enumerate`

`enumerate` is useful when you need a counter along with the items:
```python
fruits = ['apple', 'banana', 'cherry']
for index, fruit in enumerate(fruits):
    print(index, fruit)
```

### Iterating with `zip`

`zip` allows you to iterate over multiple sequences in parallel:
```python
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name} is {age} years old")
```

### Iterating with List Comprehensions

List comprehensions provide a concise way to create lists:
```python
squares = [x**2 for x in range(10)]
print(squares)
```

### Iterating with Generator Expressions

Generator expressions are similar to list comprehensions but are more memory efficient:
```python
squares = (x**2 for x in range(10))
for square in squares:
    print(square)
```

These are some of the common ways to iterate in Python. Depending on your specific use case, you might choose one method over another for better readability or performance.
