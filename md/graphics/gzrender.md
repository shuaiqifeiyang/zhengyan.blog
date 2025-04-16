---
{
  "title": "GzRender (CSCI-580)",
  "draft": false,
  "created_at": "2021-11-08",
  "category": "Computer Graphics",
  "tags": ["Computer Graphics"],
  "description": "CSCI 580 Class Notes"
}
---
A renderer supporting rasterization, transformation, Phong shading, texture.
<!--more-->
## Rasterization
Use barycentric coordinates to determine wheter a pixel is in a triangle.  
$(x_0, y_0),(x_1,y_1),(x_2,y_2)$ are three vertexex of a triangle.  w
$x_{min}=floor(x_i)$  
$x_{max}=ceiling(x_i)$  
$y_{min}=floor(y_i)$  
$y_{max}=ceiling(y_i)$  
for $y=y_{min}$ to $y_{max}$ do  
&emsp;for $x=x_{min}$ to $x_{max}$ do  
&emsp;&emsp;$\alpha=f_{12}(x,y)/f_{12}(x_0, y_0)$  
&emsp;&emsp;$\beta=f_{20}(x,y)/f_{20}(x_1, y_1)$  
&emsp;&emsp;$\gamma=f_{01}(x,y)/f_{01}(x_2, y_2)$  
&emsp;&emsp;if ($\alpha>0$ and $\beta>0$ and $\gamma>0$) then  
&emsp;&emsp;&emsp;$c=\alpha c_0+\beta c_1+\gamma c_2$  
&emsp;&emsp;&emsp;drawpixal($x$, $y$) with color $c$

Here $f_{ij}:$  
$f_{01}(x, y)=(y_0-y_1)x+(x_1-x_0)y+x_0y_1-x_1y_0$  
$f_{12}(x, y)=(y_1-y_2)x+(x_2-x_1)y+x_1y_2-x_2y_1$  
$f_{20}(x, y)=(y_2-y_0)x+(x_0-x_2)y+x_2y_0-x_0y_2$
![](https://raw.githubusercontent.com/shuaiqifeiyang/Tiramisu/main/content/posts/projects/img/GzRender2.png)  

## Transformation
### Model Space -> World Space
$rotate-z(\theta)=
\begin{bmatrix}
cos\theta & -sin\theta & 0 & 0\\\\ 
sin\theta & cos\theta & 0 & 0\\\\ 
0 & 0 & 1 & 0\\\\ 
0 & 0 & 0 & 1
\end{bmatrix}$

$rotate-x(\theta)=
\begin{bmatrix}
1 & 0 & 0 & 0\\\\ 
0 & cos\theta & -sin\theta & 0\\\\ 
0 & sin\theta & cos\theta & 0\\\\ 
0 & 0 & 0 & 1
\end{bmatrix}$

$rotate-y(\theta)=
\begin{bmatrix}
cos\theta & 0 & sin\theta & 0\\\\ 
0 & 1 & 0 & 0\\\\ 
-sin\theta & 0 & cos\theta & 0\\\\ 
0 & 0 & 0 & 1
\end{bmatrix}$

### World Space -> Camera Space
Assume $u,v,w$ is three base vectors in Camera Space, and the position of camera is $e$
$M_{cam}=
\begin{bmatrix}
x_u & y_u & z_u & 0\\\\ 
x_v & y_v & z_v & 0\\\\ 
x_w & y_w & z_w & 0\\\\ 
0 & 0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
1 & 0 & 0 & -x_e\\\\ 
0 & 1 & 0 & -y_e\\\\ 
0 & 0 & 1 & -z_e\\\\ 
0 & 0 & 0 & 1
\end{bmatrix}$

$$w=\frac{g}{\parallel g\parallel}$$
$$u=\frac{t\times w}{\parallel t\times w\parallel}$$
$$v=w\times v$$

### Camera Space -> Perspective Space
![](https://raw.githubusercontent.com/shuaiqifeiyang/Tiramisu/main/content/posts/projects/img/GzRender1.png)  
$M_{perspective}=\begin{bmatrix}
1 & 0 & 0 & 0\\\\ 
0 & 1 & 0 & 0\\\\ 
0 & 0 & 1/d & 0\\\\ 
0 & 0 & 1/d & 1
\end{bmatrix}$
Use fourth dimension to make perspective effect.
### Perspective Space -> Screen Space
$xs$ means the number of pixels in screen width. $ys$ means the number of pixels in screen height
$M_{screen}=\begin{bmatrix}
xs/2 & 0 & 0 & xs/2\\\\ 
0 & -ys/2 & 0 & ys/2\\\\ 
0 & 0 & MAXINT & 0\\\\ 
0 & 0 & 0 & 1
\end{bmatrix}$
![](https://raw.githubusercontent.com/shuaiqifeiyang/Tiramisu/main/content/posts/projects/img/GzRender3.png)  

## Shading
$Color=(K_s\sum_{l}l_e(R\cdot E)^s) + (K_d\sum_{l}l_e(N\cdot L))+(K_al_a)$

Phong Shading: interpolate nomals.  
Gouraud Shading: interpolate colars.
![](https://raw.githubusercontent.com/shuaiqifeiyang/Tiramisu/main/content/posts/projects/img/GzRender4.png)  

## Texture
![](https://raw.githubusercontent.com/shuaiqifeiyang/Tiramisu/main/content/posts/projects/img/GzRender5.png)  