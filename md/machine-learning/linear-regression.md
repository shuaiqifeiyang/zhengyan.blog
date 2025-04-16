---
{
  "title": "Linear Regression (CSCI-567)",
  "draft": false,
  "created_at": "2022-02-01",
  "category": "AI",
  "tags": ["Machine Learning"],
  "description": "CSCI-567 Class Notes"
}
---

**Regression VS Classification**

* continuous vs discrete
* measure prediction error differently

**Measure error for one prediction**

* absolute error: |prediction - sale price|
* squared error: (prediction - sale price)^2

**Formal set up for linear regression**

* input: $\vec x\in\mathbb{R}^D$
* Output: $y\in\mathbb{R}$
* Training data: $D=\{(\vec{x_n}, y_n),n=1,2,...,N\}$
* Linear model: $f:\mathbb{R}^D\rightarrow\mathbb{R}$, with $f(\vec{x})=w_0+\sum_{d=1}^{D}w_dx_d=w_0+\vec{w}^T\vec{x}$
  * For notation convenience $f(\vec{x})=\tilde{\boldsymbol{w}}^T\tilde{\boldsymbol{x}}=\tilde{\boldsymbol{x}}^T\tilde{\boldsymbol{w}}$, where $\tilde{\boldsymbol{w}}=[w_0,w_1,w_2,...,w_D]^T,\tilde{\boldsymbol{x}}=[1,x_1,x_2,...,x_D]^T$

**RSS**(Residual sum of squares)

$RSS(\tilde{\boldsymbol{w}})=\sum\limits_{n}(f(\vec{x_n})-y_n)^2=\sum\limits_{n}(\tilde{\boldsymbol{w}}^T\tilde{\boldsymbol{x}}_n-y_n)^2=\sum\limits_{n}(\tilde{\boldsymbol{x}}_n^T\tilde{\boldsymbol{w}}-y_n)^2$

**Empirical risk minimizer**/Least squares solution

$\tilde{\boldsymbol{w}}^\ast=\mathop{argmin}\limits_{\tilde{\boldsymbol{w}}\in\mathbb{R}^{D+1}}\ RSS(\tilde{\boldsymbol{w}})$

**General Least Square Solution**

Object: $RSS(\tilde{\boldsymbol{w}})=\sum\limits_{n}(\tilde{\boldsymbol{w}}^T\tilde{\boldsymbol{x}}_n-y_n)^2$

$\nabla RSS(\tilde{\boldsymbol{w}})=2\sum\limits_{n}\tilde{\boldsymbol{x}}_n(\tilde{\boldsymbol{w}}^T\tilde{\boldsymbol{x}}_n-y_n)\propto\sum\limits_{n}\tilde{\boldsymbol{x}}_n\tilde{\boldsymbol{x}}_n^T\tilde{\boldsymbol{w}}-\sum\limits_ny_n\tilde{\boldsymbol{x}}_n$

notation: $\tilde{\boldsymbol{X}}=\begin{pmatrix}
\tilde{\boldsymbol{x}}_1^T\\\\ 
\tilde{\boldsymbol{x}}_2^T\\\\ 
\vdots\\\\ 
\tilde{\boldsymbol{x}}_N^T
\end{pmatrix}\in\mathbb{R}^{N\times(D+1)},\tilde{\boldsymbol{y}}=\begin{pmatrix}
y_1\\\\ 
y_2\\\\ 
\vdots\\\\ 
y_n
\end{pmatrix}\in\mathbb{R}^{N\times1}$

$\nabla RSS(\tilde{\boldsymbol{w}})=(\tilde{\boldsymbol{X}}^T\tilde{\boldsymbol{X}})\tilde{\boldsymbol{w}}-\tilde{\boldsymbol{X}}^T\boldsymbol{y}=0$

$\tilde{\boldsymbol{w}}^\ast=(\tilde{\boldsymbol{X}}^T\tilde{\boldsymbol{X}})^{-1}\tilde{\boldsymbol{X}}^T\boldsymbol{y}$

When $D=0,(\tilde{\boldsymbol{X}}^T\tilde{\boldsymbol{X}})^{-1}=\frac{1}{N},\tilde{\boldsymbol{X}}^T\boldsymbol{y}=\sum_n y_n,\tilde{\boldsymbol{w}}^\ast=\frac{\sum_n y_n}{N}$

* Invert the matrix $\tilde{\boldsymbol{X}}^T\tilde{\boldsymbol{X}}$ takes $O(D^3)$

**What if $\tilde{\boldsymbol{X}}^T\tilde{\boldsymbol{X}}$ is not invertible**

* When $n<D+1$, not enough data to estimate all parameters.
* $\tilde{\boldsymbol{X}}^T\tilde{\boldsymbol{X}}$ is symmetric
* eigen decomposition:  

$\tilde{\boldsymbol{X}}^T\tilde{\boldsymbol{X}}=\boldsymbol{U}^T\begin{bmatrix}\lambda_1&0&\cdots&0\\\\0&\lambda_2&\cdots&0\\\\\vdots&\vdots&\vdots&\vdots\\\\0&\cdots&\lambda_{D}&0\\\\0&\cdots&0&\lambda_{D+1}\end{bmatrix}\boldsymbol{U}$

$(\tilde{\boldsymbol{X}}^T\tilde{\boldsymbol{X}})^{-1}=\boldsymbol{U}^T\begin{bmatrix}1/\lambda_1&0&\cdots&0\\\\0&1/\lambda_2&\cdots&0\\\\\vdots&\vdots&\vdots&\vdots\\\\0&\cdots&1/\lambda_{D}&0\\\\0&\cdots&0&1/\lambda_{D+1}\end{bmatrix}\boldsymbol{U}$

**Non-invertible means some eigenvalues are zero**

**One natural fix: add something positive:**

$\tilde{\boldsymbol{X}}^T\tilde{\boldsymbol{X}}+\lambda\boldsymbol{I}=\boldsymbol{U}^T\begin{bmatrix}\lambda_1+\lambda&0&\cdots&0\\\\0&\lambda_2+\lambda&\cdots&0\\\\\vdots&\vdots&\vdots&\vdots\\\\0&\cdots&\lambda_{D}+\lambda&0\\\\0&\cdots&0&\lambda_{D+1}+\lambda\end{bmatrix}\boldsymbol{U}$

The solution becomes: $\tilde{\boldsymbol{w}}^\ast=(\tilde{\boldsymbol{X}}^T\tilde{\boldsymbol{X}}+\lambda\boldsymbol{I})^{-1}\tilde{\boldsymbol{X}}^T\boldsymbol{y}$

**Parametric VS Non-parametric**:

* Parametric methods: the size of the model does not grow with the size of the training set N
* Non-parametric methods: the size of the model grows with the size of the training set

## Linear regression with nonlinear basis

* Use a nonlinear mapping: $\phi(\vec x):\vec x\in\mathbb{R}^D\rightarrow\vec z\in\mathbb{R}^M$, transform the data to a more complicated feature space.
* Then apply linear regression.

**Model**: $f(\vec x)=\vec w^T\phi(\vec x)$, where $\vec w\in\mathbb{R}^M$

**Objective**: $RSS(\vec w)=\sum\limits_{n}(\vec w^T\phi(\vec x_n)-y_n)^2$

**Least square solution**: $\vec w^\ast=(\boldsymbol\Phi^T\boldsymbol\Phi)^{-1}\boldsymbol\Phi^T\vec y$, where $\boldsymbol{\Phi}=\begin{pmatrix}
\phi(\boldsymbol{x}_1)^T\\\\ 
\phi(\boldsymbol{x}_2)^T\\\\ 
\vdots\\\\ 
\phi(\boldsymbol{x}_3)^T
\end{pmatrix}\in\mathbb{R}^{N\times M}$

**Underfitting**:

* large training error
* large test error

**overfitting**:

* small training error
* large test error

**How to prevent overfitting**:

* use more data
* control the model complexity
  * For polynomial basis, the degree M clearly controls the complexity
  * Use cross-validation to pick hyper-parameter M

**Regularized linear regression**:

$\varepsilon(\vec w)=RSS(\vec w)+\lambda R(\vec w)$
