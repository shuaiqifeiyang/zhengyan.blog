---
{
  "title": "Docker Images and Containers",
  "draft": false,
  "created_at": "2025-05-07",
  "category": "DevOps",
  "tags": ["Dcoker"],
  "description": "Docker Cookbook"
}
---



## Images & Containers

A **Docker Image** is like a blueprint or a snapshot of your application, including all the necessary dependencies and configurations.

A **Docker Container** is a running instance of this image. It is a lightweight, isolated runtime environment that uses the image as its base.



## Using & Running External Images

```bash
docker run node # this node docker will exit automatically
docker run -it node # in this case, we can interact with the node docker

docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=mysql -p 3306:3306 -d mysql:9.3.0
```



## Build Image with a Dockerfile

```dockerfile
FROM node

# by default the WORKDIR is /root
WORKDIR /app

copy . /app

RUN npm install

# this is optional, this doesn't really expose the port
EXPOSE 80

CMD ["node", "server.js"]
```

👉 **RUN vs CMD**

* **`RUN`**: Executes commands during **image build time**, creating a new layer in the image.
  - Example: `RUN apt-get install -y nodejs` (Installs Node.js in the image).
* **`CMD`**: Sets the **default command** to run when the container starts.
  - Example: `CMD ["node", "app.js"]` (Starts the Node.js app when the container runs).

👉 **The command to build an image from Dockerfile**

```bash
docker build -t myapp:latest $path_to_Dockerfile
```

👉 **Image Layers**

- **Docker Image Layers**: Each Docker image is composed of multiple layers, which are created sequentially from each instruction in the `Dockerfile` (like `FROM`, `RUN`, `COPY`).
- **How Layers Work**:
  - Each layer is a **read-only snapshot** of the filesystem.
  - Changes in one layer do not affect other layers.
  - Layers are **cached**, making image builds faster.
- **Example**:

```dockerfile
# Dockerfile Example
FROM ubuntu:20.04          # Base layer (first layer)
RUN apt-get update         # Second layer
RUN apt-get install -y curl # Third layer
COPY . /app                # Fourth layer
```

- **Layer Optimization**:
  - Layers are reused if the instructions haven't changed.
  - Minimize the number of layers for a smaller image size.

## Manage Images & Containers

💡 use --help to see all options

```bash
# list all images
docker images

# list containers that are running
docker ps

# list all containers including the stopped ones
docker ps -a

docker image inspect image_id
```

## Stopping & Restarting Containers

```bash
docker start $container_name_or_container_id # start an stopped container, by default in detach mode
docker restart $container_name_or_container_id # restart an existing container
docker stop $container_name_or_container_id # stop an existing container
docker run # create a new container based on the image、
```

👉 **docker run vs docker start**

- **`docker run`**:
  - Creates a new container from an image.
  - Runs the container immediately.
  - Can accept options (e.g., environment variables, port mappings).
  - Example: `docker run -d --name my_container my_image`.
- **`docker start`**:
  - Starts an existing, stopped container.
  - Does not create a new container.
  - Only works with containers that have been previously created.
  - Example: `docker start my_container`.

## Attached & Detached Containers

The **detached mode** is the default for running with **docker start**

The **attached mode** is the default for unning with **docker run**

```bash
docker container attach $container_name_or_container_id
docker logs $container_name_or_container_id # show the console output of container
docker logs -f $container_name_or_container_id # follow
```

## Interactive Mode

| Feature          | `-it` (t means pseudo-tty)              | `-a`                                        |
| ---------------- | --------------------------------------- | ------------------------------------------- |
| Interactive      | Yes (you can type and execute commands) | No (only attaches to specified I/O streams) |
| TTY Allocated    | Yes                                     | No                                          |
| Common Use Cases | Shell, Python REPL, MySQL CLI           | Background program logging or debugging     |
| Example          | `docker run -it ubuntu bash`            | `docker run -a stdout alpine echo`          |

## Deleting Images & Containers

```bash
# remove container
docker rm container_name

# remove image
# the corresponding containers need to be removed first
docker rmi image_id

# remove unused images
docker image prune
```

## Removing Stopped Containers Automatically

```bash
# automatically remove the container and its associated anonymous vlumns when it exits
docker run --rm image_id
```

## Copying Files Into & From A Container

```bash
docker cp $path_from $path_to
```

## Naming & Tagging Containers and Images

```bash
docker build -t image_name:tag . 
docker run --name $container_name $image_id
docker tag $old_name:$old_tag $new_name:$new_tag #rename a image
```

## Pushing Images to DockerHub

1. Create a repo on docker hub
2. Push the local image to docker hub



