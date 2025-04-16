---
{
  "title": "ML Basic Concepts (CSCI-567)",
  "draft": false,
  "created_at": "2022-01-13",
  "category": "AI",
  "tags": ["Machine Learning"],
  "description": "CSCI-567 Class Notes"
}
---
Prerequisite knowledge of CSCI-567 Machine Learning

<!--more-->

**Sample Space**$(\Omega)$: set of all possible outcomes or realizations

**Event$(A)$**: A subset of sample space

**Probability**: We assign a real number $P(A)$ to each event $A$, called the probability of $A$

**Probability Axioms**:

1. $P(A)\ge0$ for every $A$
2. $P(\Omega)=1$
3. If $A_1, A_2,...$ are disjoints, then $P(\bigcup_{i=1}^{\infty}A_i)=\sum_{i=1}^{\infty}P(A_i)$

**Random Variable**: A random variable is a measurable function that maps a probability space into a measurable space.

A **random variable** is a [variable whose values depend](https://en.wikipedia.org/wiki/Dependent_and_independent_variables) on [outcomes](https://en.wikipedia.org/wiki/Outcome_(probability)) of a [random](https://en.wikipedia.org/wiki/Randomness) event.

The data are specific realizations of random variables

A statistic is just any function of the data or random variable.

**Distribution Function**

Definition: Suppose $X$ is a random variable, $x$ is a specific value of it, **Cumulative Distribution Function** is the function $F:R\rarr[0,1]$ ,where $F(x)=P(X\leq x)$

If $X$ is discrete $\Rightarrow$ probability mass function: $f(x)=P(X=x)$

If $X$ is continuous $\Rightarrow$ **probability density function** for $X$ if there exists a function $F$ such that $f(x)\geq 0$ for all $x$, $\int_{-\infty}^{\infty}f(x)dx=1$ and for every $a\leq b$, 

$$
P(a\leq X\leq b)=\int_a^bf(x)dx
$$

If $F(x)$ is differentiable everywhere, $f(x)=F^\prime(x)$

**Expected Values**

* Discrete random variable X, $E[g(X)]=\sum_{x\in \chi}g(x)f(x)$
* Continuous random variable X, $E[g(x)]=\int_{-\infty}^\infty g(x)f(x)$

**Mean and Variance**

$\mu=E[X]$ is the mean; $var[X]=E[(X-\mu)^2]$ is the variance. We also have $var[X]=E[X^2]-\mu^2$

**Common Distributions**

**Multivariate Distributions**

$F_{X,Y}(x,y):=P(X\leq x,Y\leq y)$

$f_{X,Y}(x,y):=\frac{\partial^2F_{X,Y}(x,y)}{\partial x\partial y}$

**Marginal Distribution of X**(Discrete case):

$f_X(x)=P(X=x)=\sum_yP(X=x,Y=y)=\sum_yF_{X,Y}(x,y)$

or $F_X(x)=\int_yf_{X,Y}(x,y)dy$ for continuous variable

**Conditional probability** of $X$ given $Y=y$ is

$f_{X|Y}(x|y)=P(X=x|Y=y)=\frac{P(X=x,Y=y)}{P(Y=y)}=\frac{f_{X,Y}(x,y)}{F_Y(y)}$

**Law of total Probability**:$X$ takes values $x_1,...,x_n$ and y is a value of Y, we have
$$
F_Y(y)=\sum_jf_{Y|X}(y|x_j)f_X(x_j)
$$

Bayes Rule:

$$
P(A|B)=\frac{P(B|A)P(A)}{P(B)}
$$

$$
f_{X|Y}(x_i|y)=\frac{f_{Y|X}(y|x_i)f_X(x_i)}{\sum_jf_{Y|X}(y|x_j)f_X(x_j)}
$$

$$
f_{X|Y}(x|y)=f_{X|Y}(x_i|y)=\frac{f_{Y|X}(y|x_i)f_X(x_i)}{\int_xf_{Y|X}(y|x)f_X(x)dx}
$$

**Independent Variables** $X$ and $Y$ are independent if and only if:

$P(X=x, Y=y)=P(X=x)P(Y=y)$ or $f_{X,Y}(x,y)=f_X(x)f_y(y)$ for all values $x$ and $y$.

**IID variables**: Independent and identically distributed random variables are drawn from the same distribution and are all mutually independent.

If $X_1,...X_n$ are independent, we have

$$
E[\prod_{i=1}^{n}X_i]=\prod_{i=1}^{n}E[X_i], var[\sum_{i=1}^na_iX_i]=\sum_{i=1}^na_i^2var[X_i]
$$

**Linearity of Expectation**: Even if $X_1,...,X_n$ are not independent,

$$
E[\sum_{i=1}^nX_i]=\sum_{i=1}^nE[X_i]
$$

**Covariance**
$$
cov(X,Y)=E[(X-\mu_x)(Y-\mu_y)]=E[X\cdot Y]-\mu_x\mu_y
$$

**Correlation coefficients**

$$
corr(X,Y)=Cov(X,Y)/\sigma_x\sigma_y $$ 
($\sigma$: standard deviation)

**Sample Mean**:

 $$\overline{X}=\frac{1}{N}\sum_{i=1}^NX_i
$$

**Sample Variance**:
$$
S^2=\frac{1}{N-1}\sum_{i=1}^N(X_i-\overline X)^2
$$

If $X_i$ are iid:

$$
E[\overline X]=E[X_i]=\mu
$$

$$
Var(\overline X)=\sigma^2/N
$$

$$
E[S^2]=\sigma^2
$$

**Point Estimation**

The point estimator $\hat{\theta}_N$ is a function of samples $X_1,...,X_N$ that approximates a parameter $\theta$ of the distribution of $X_i$.

**Sample Bias**: the bias of an estimator is

$$
bias(\hat{\theta}_N)=E_\theta[\hat\theta_N]-\theta
$$

An estimator is unbiased estimator if $E_\theta[\hat\theta_N]=\theta$

**Standard error**: the standard deviation of $\hat\theta_N$ is called the standard error

$$
se(\hat\theta_N)=\sqrt{Var(\hat\theta_N)}
$$
**Information Theory**

Suppose $X$ can have one of the m values: $x_1, x_2,...,x_m$. The probability distribution is $P(X=x_i)=p_i$

Entropy: $H(X)=-\sum_{j=1}^{m}p_i\log p_i$

* "High entropy" means X is from a uniform distribution

* "Low entropy" means X is from varied distribution

**Conditional Entropy**

$H(Y|X)=\sum_{i=1}^{m}p_iH(Y|X=x_i)=-\sum_{i=1}^{m}\sum_{j=1}^{n}p(x_i,y_i)\log p(y_i|x_i)$

**mutual information** (**MI**) of two [random variables](https://en.wikipedia.org/wiki/Random_variable) is a measure of the mutual [dependence](https://en.wikipedia.org/wiki/Statistical_dependence) between the two variables. More specifically, it quantifies the "[amount of information](https://en.wikipedia.org/wiki/Information_content)" (in [units](https://en.wikipedia.org/wiki/Units_of_information) such as [shannons](https://en.wikipedia.org/wiki/Shannon_(unit)) ([bits](https://en.wikipedia.org/wiki/Bit)), [nats](https://en.wikipedia.org/wiki/Nat_(unit)) or [hartleys](https://en.wikipedia.org/wiki/Hartley_(unit))) obtained about one random variable by observing the other random variable. $I(Y;X)=H(Y)-H(Y|X)$

$I(Y;X)=I(X;Y)=H(X)+H(Y)-H(X,Y)$

In [mathematical statistics](https://en.wikipedia.org/wiki/Mathematical_statistics), the **Kullback–Leibler divergence,** $KL(P\parallel Q)$![{\displaystyle D_{\text{KL}}(P\parallel Q)}](https://wikimedia.org/api/rest_v1/media/math/render/svg/039fa82bd08654b4faa2b32ded70c0160554fa07) (also called **relative entropy**), is a [statistical distance](https://en.wikipedia.org/wiki/Statistical_distance): a measure of how one [probability distribution](https://en.wikipedia.org/wiki/Probability_distribution) *Q* is different from a second, reference probability distribution *P*.

$KL(p\parallel q)=\sum p(x)log(p(x)/q(x))$

$I(X;Y)=KL(p(x,y)\parallel p(x)p(y))$

**Convex Functions:**

If for any two points $x_1$ and $x_2$ in its domain $X$ and any $t\in[0,1]$

$f(tx_1+(1-t)x_2)\le tf(x_1)+(1-t)f(x_2)$

**Convex Set:** a set S is convex if and only if for any $x_1, x_2\in S$, $tx_1+(1-t)x_2\in S$ for any $t\in[0,1]$

**Convex Optimization** is a minimization(maximization) of a convex function over a convex set.
