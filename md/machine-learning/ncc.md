---
{
  "title": "NCC (CSCI-567)",
  "draft": false,
  "created_at": "2022-01-28",
  "category": "AI",
  "tags": ["Machine Learning"],
  "description": "CSCI-567 Class Notes"
}
---

## Algorithm
**Training Data**:

* N samples/instances: $D^{TRAIN}=\{(\vec x_1, y_1),(\vec x_2, y_2),...,(\vec x_n, y_n)\}$
* Each $\vec x_n \in \mathbb{R}^D$ is called a feature vector
* Each $y_n\in[C]=\{1,2,...,C\}$ is called a label\class\catrgory
* They are used for learning $f:\mathbb{R}^D\rightarrow[C]$ for future prediction

**Nearest neighbor**: $\vec x(1)=\vec x_{nn(\vec{x})}$, $nn(\vec x)\in[N]=\{1,2,...,N\}$where $nn(x)$ is the index to one of the training instances, $nn(\vec{x})=\mathop{argmin}\limits_{n\in[N]}\parallel\vec{x}-\vec{x_n}\parallel_2=\mathop{argmin}\limits_{n\in[N]}\sqrt{\sum\limits_{d=1}^D(x_d-x_{nd})^2}$

**Classification rule**: $y=f(\vec{x})=y_{nn(\vec x)}$

**Decision boundary**: for every point in the space, we can determine its label using the NNC rule. This gives rise to a decision boundary that partitions the space into different regions.

**Accuracy**: the percentage of data points being correctly classified.

**Error Rate**: the percentage of data points being incorrectly classified.

Accuracy+Error Rate=1

**Accuracy and Error Rate defined on the training data set**:

$A^{TRAIN}=\frac{1}{N}\sum\limits_n\mathbb{I}[f(\vec{x_n})==y_n]$

$\varepsilon^{TRAIN}=\frac{1}{N}\sum\limits_n\mathbb{I}[f(\vec{x_n})\neq y_n]$

$\mathbb{I}(e)$ is the indicator function: $$\mathbb{I}(e)=\begin{cases} 1\ if\ e\ is\ true \\\\ 0\ if\ e\ is\ false \\ \end{cases}$$

For NNC, $A^{TRAIN}=100\%$,$\varepsilon^{TRAIN}=0$

**Test/Evaluation data**

* $D^{TEST}=\{(\vec x_1, y_1),(\vec x_2, y_2),...,(\vec x_m, y_m)\}$
* A fresh dataset, not overlap with training set
* Test accuracy and test error
  * $A^{TRAIN}=\frac{1}{M}\sum\limits_m\mathbb{I}[f(\vec{x_m})==y_m]$
  * $\varepsilon^{TRAIN}=\frac{1}{M}\sum\limits_m\mathbb{I}[f(\vec{x_m})\neq y_m]$
* Test accuracy and test error are better measurement than train accuracy and train error

**Variant of NNC**

1. measure nearness with other distances, for example $L_p$ distance: $\parallel\vec {x}-\vec{x_n}\parallel_p=(\sum\limits_d |x_d-x_{nd}|^p)^\frac{1}{p}$, for $p\geq1$

2. K-nearest neighbor, every neighbor votes for its lable. Predict with the majority

   1. with K increases, the decision boundary becomes smoother

3. Preprocessing data.

   One issue of NNC: distances depend on units of the features. We can process data so it looks more "normalized".

   * Compute the means and standard deviations in each feature
     * $\bar{x_d}=\frac{1}{N}\sum\limits_n x_{nd}$
     * $s_d^2=\frac{1}{N-1}\sum\limits_n(x_{nd}-\bar{x_d})^2$
   * Scale the feature accordingly
     * $x_{nd}\leftarrow\frac{x_{nd}-\bar{x_d}}{s_d}$

**Hyper-parameters in NCC**

* The distance measure (e.g. the parameter $p$ for $L_P$ norm)
* K (how many nearest neighbor)
* Different ways of preprocessing data

**Dataset**

* Training data are used for learning $f(\cdot)$
* Test data are used for assessing how well $f(\cdot)$ do
* Development/Validation data are used to optimize hyper-parameters.

**Recipe**

* For each possible value of the hyperparameter
  * Train a model using $D^{TRAIN}$
  * Evaluate the performance of the model on $D^{DEV}$
* Choose the model with the best performance on $D^{DEV}$
* Evaluate the model on $D^{TEST}$

**S-fold Cross-validation**

* When we do not have a development set
* Split the training data in to S equal parts
* Use each part in turn as a development dataset and use the others as a training dataset
* Choose the hyper-parameter leading to best average performance
* Use the best hyper-parameter to train a model using all $D^{TRAIN}$

**Advantage of NNC**

* Simple, easy to implement

**Disadvantage of NNC**

* Computationally intensive for large scale problems: $O(ND)$ for each prediction.
* Need to carry the training data around. This type of method is called **nonparametric**
* Choosing the right hyper-parameters can be involved

**Typical steps of development a machine learning system**

* Collect data, split into training, development, and test sets.
* Train a model with a machine learning algorithm. Most often we apply cross-validation to tune hyper-parameters.
* Evaluate using the test data and report performance
* Use the model to predict future/make decisions.

## How good is NNC?

**Most standard assumption**: every data point $(\vec{x}, y)$ (from $D^{TRAIN},D^{DEV},D^{TEST}$) is an independent identically distribution (i.i.d) sample of an unknown joint distribution $P$.

* often written as $(\vec{x}, y) \mathop{\sim}\limits^{i.i.d}P$

Test error of a fixed classifier is therefore a random variable, and the expectation of test error is the expected error\mistake of $f$

$E[\varepsilon^{TEST}]=\frac{1}{M}\sum\limits_{m=1}^{M}E_{(\vec{x_m}, y_m)\sim P}\mathbb{I}[f(\vec{x_m})\neq y_m]=E_{(\vec{x}, y)\sim P}\mathbb{I}[f(\vec{x})\neq y]$

**Test error is a proxy of expected error. The larger the test set, the better the approximation.**

**Expected risk**

More generally, for a loss funcion $L(y^\prime, y)$, the expected risk of $f$ is defined as $R(f)=E_{(\vec x, y)\sim P}L(f(\vec x), y)$

* $L(y^\prime, y)=\mathbb{I}[y^\prime \neq y]$ called **0-1 loss**

**Bayes optimal classifier**: $f^\ast(x)=\mathop{argmax}\limits_{c\in[C]}P(c|x)$

**The optimal risk**: $R(f^\ast)=E_{x\sim P_x}[1-max_{c\in[C]}P(c|x)]$ where $P_x$ is the marginal distribution of x.

It is easy to show $R(f^\ast)\leq R(f)$ for any $f$.

For special case $C=2$, let $\eta(x)=P(0|x)$, then $R(f^\ast)=E_{x\sim P_x}[min\{\eta(x), 1-\eta(x)\}]$
