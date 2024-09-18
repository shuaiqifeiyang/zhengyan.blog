---
{
  "title": "Common Linux Command Cheatsheet (Updating...)",
  "draft": false,
  "created_at": "2024-09-16",
  "category": "DevOps",
  "tags": ["Linux"],
  "description": "Most Common Linux Command Cheatsheet"
}
---

## Manual

To check the manual for a command, you can use the `man` command

```bash
man ls
man rm
...
```

## File/Folder

### Basic Operations

```bash
# list files and directories
ls -l # show detailed information
ls -a # show hidden files
ls -lh # display human-redable file sizes

# remove
rm -r directory # remove directory recursively
rm -f file.txt # force removal
rm -rf directory # delete forcefully and recursively
rm -rf ./* # remove all contents 

# copy
cp -r directory destination 
# if destination exists, the new directory will be placed 
# under the extsting folder. else if destination and the 
# destination only has more than 1 segment doesn't exist, 
# error occurs. 
cp file.txt directory 

# move
mv old.txt new.txt # rename
mv file.txt directory

# create
touch file.txt

# show the start of a file
head -n 5 file.txt # show top 5 lines

# show the end of a file
tail -n 100 file.txt # show last 100 lines

# find
find /path/to/search -name "*.txt"

# move file from server to local
scp /path/to/local/file username@remote_host:/path/to/remote/directory

# move file from local to server
scp username@remote_host:/path/to/remote/file /path/to/local/directory
```

### File Permission Commands

`drwxr-xr-x`

1. **`d`**: The first character represents the file type. In this case, `d` means it's a **directory**. If it was a file, this character would be `-`.

2. **`rwxr-xr-x`**: The next nine characters represent the file permissions, divided into three groups of three:

   - `rwx`: The first group of three characters (after the `d`) shows the permissions for the owner

      (**the user who owns the directory or file**).

     - `r` means the owner has **read** permission.
     - `w` means the owner has **write** permission.
     - `x` means the owner has **execute** permission (for a directory, this means the owner can list its contents).

   - `r-x`: The second group represents the permissions for the group

      (**other users who are part of the file’s group**).

     - `r` means group members can **read** the file/directory.
     - `-` means group members cannot **write** to the file/directory.
     - `x` means group members can **execute** the file or access the directory.

   - `r-x`: The third group shows the permissions for others

      (**everyone else**).

     - `r` means others can read the file/directory.
     - `-` means others cannot write to the file/directory.
     - `x` means others can execute the file or access the directory.

```bash
chmod 755 myfile
# 7: rwx (owner)
# 5: r-x (group)
# 5: r-x (others)

# check which group I belong to
groups
# The id command provides more detailed information about your user ID 
# and group memberships:
id
```

## Vim

`:w` - Save the file (write changes to disk).

`:q` - Quit Vim.

`:wq` - Save the file and quit Vim.

`:q!` - Quit without saving changes.

`0` (zero) - Move to the beginning of the current line.

`$` - Move to the end of the current line.

`dd` - Delete the current line.
