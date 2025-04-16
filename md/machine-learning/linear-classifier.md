---
{
  "title": "Linear Classifier (CSCI-567)",
  "draft": false,
  "created_at": "2022-02-09",
  "category": "AI",
  "tags": ["Machine Learning"],
  "description": "CSCI 567 Class Notes"
}
---

Classification:

* N samples/instances: $D^{TRAIN}=\{(\vec x_1, y_1),(\vec x_2, y_2),...,(\vec x_n, y_n)\}$
* Each $\vec x_n \in \mathbb{R}^D$ is called a feature vector
* Each $y_n\in[C]=\{1,2,...,C\}$ is called a label\class\catrgory
* They are used for learning $f:\mathbb{R}^D\rightarrow[C]$ for future prediction

This post is focus on **binary classification**.

* Number of classes: C=2
* Labels: {-1, +1}

**Model**: $\mathcal F=\{f(\vec x)=sign(\vec w^T\vec x)|\vec x\in\mathbb{R}^D\}$, $sign(\vec w^T\vec x)=\begin{cases} +1\ if\ \vec w^T\vec x>0\\\\ -1\ if\ \vec w^T\vec x\leq0\\ \end{cases}$

## Loss Function

$z=y_n\vec w^T\vec x$

* **perceptron loss**:$l_{\mathrm{perceptron}}(z)=max\{0, -z\}$
* **hinge loss**: $l_\mathrm{hinge}(z)=max\{0,1-z\}$
* **logistic loss**: $l_\mathrm{logistic}=log(1-exp(-z))$

## Find ERM (Empirical Risk Minimization)

$\vec w^\ast=\mathop{argmin}\limits_{\vec w\in\mathbb{R}^D}\sum\limits_{n=1}^Nl(y_n\vec w^T\vec x_n)$

minimizing perceptron loss does not really make sense (try $\vec w=\vec 0$), but the algorithm derived from this perspective does.

### Gradient Descent (GD)

* Gradient is sometimes referred to as first-order information of a function. Therefore, these methods are called first-order methods.

**Goal**: minimize $F(\vec w)$

**Algorithm**: move a bit in the negative gradient direction. $\vec w^{(t+1)}\leftarrow\vec w^{(t)}-\eta\nabla F(\vec w^{(t)})$, where $\eta>0$ is called step size or learning rate.

* in theory $\eta$ should be set in terms of some parameters of $F$
* in practice we just try several small values

Essentially, GD is Taylor approximation: $F(\vec w)\approx F(\vec w^{(t)})+\nabla F(\vec w^{(t)})^T(\vec w-\vec w^{(t)})$, we use $-\eta\nabla F(\vec w^{(t)})$ represents $\vec w-\vec w^{(t)}$, so $F(\vec w^{(t+1)})\approx F(\vec w^{(t)})-\eta\parallel\nabla F(\vec w^{(t)})\parallel_2^2\leq F(\vec w^{(t)})$

### Stochastic Gradient Descent (SGD)

$\vec w^{(t+1)}\leftarrow\vec w^{(t)}-\eta\tilde\nabla F(\vec w^{(t)})$, where $\tilde\nabla F(\vec w^{(t)})$ is a random variable (called **stochastic gradient**) $\mathbb{E}[\tilde\nabla F(\vec w^{(t)})]=\nabla F(\vec w^{(t)})$

It could be much faster to obtain a stochastic gradient!

Convergence guarantees for both GD and SGD on convex objectives.

### Applying GD to perceptron loss

$F(\vec w)=\sum\limits_{n=1}^Nmax\{0, -y_n\vec w^T\vec x_n\}$

$\nabla F(\vec w)=\sum\limits_{n=1}^N-\mathbb{I}[y_n\vec w^T\vec x_n\leq0]y_n\vec x_n$, only misclassified examples contribute to the gradient

**GD update**: $\vec w\leftarrow\vec w+\eta\sum\limits_{n=1}^N\mathbb{I}[y_n\vec w^T\vec x_n\leq0]y_n\vec x_n$

Each update makes one pass of the entire training set

### Applying SGD to perception loss

How to construct a stochastic gradient?

Pick one example $n\in[N]$ uniformly at random, $\tilde\nabla F(\vec w)=-N\mathbb{I}[y_n\vec w^T\vec x_n\leq0]y_n\vec x_n$

**SGD update**: $\vec w\leftarrow\vec w+\eta\mathbb{I}[y_n\vec w^T\vec x_n\leq0]y_n\vec x_n$ ($\eta$ absorbing the constant N) (each update touches only one data point!)

### Perceptron Algorithm

Perceptron algorithm is SGD with $\eta=1$ applied to perceptron loss:

Repeat:

* Pick a data point $\vec x_n$ uniformly at random
* If $sgn(\vec w^T\vec x_n)\neq y_n$, $\vec w\leftarrow\vec w+y_n\vec x_n$

Note:

* $\vec w$ is always a linear combination of the training examples.
* $\eta=1$ does not really matter in terms of training error.

If training set is linearly separable

* perceptron converges in a finite number of stpes
* training error is 0

**sigmoid function**: $\sigma(z)=\frac{1}{1+e^{(-z)}}$

* $\sigma(z)$ is between 0 and 1
* $\sigma(\vec w^T\vec x)>=0.5 \Leftrightarrow\vec w^T\vec x\geq0$, consistent with predicting the label with $sign(\vec w^T\vec x)$
* larger $\vec w^T\vec x\Rightarrow$ larger $\sigma(\vec w^T\vec x)\Rightarrow$ higher confidence in label 1
* $\sigma(z)+\sigma(-z)=1$ for all $z$