---
{
  "title": "MySQL Installation with Brew",
  "draft": false,
  "created_at": "2024-09-03",
  "category": "Troubleshooting",
  "tags": ["MySQL", "Homebrew"],
  "description": "I've installed multiple mysql version via Brew. mysql@8.4 can't run successfully on my laptop"
}
---

MySQL@9 doesn't support standard password. If we're going to use standard password we need to downgrade mysql from version 9 to version 8. For now, if we run `brew install mysql`, mysql@9 will be installed by default. If we need version 8, we need to indicate version explicitly by running `brew install mysql@8.4`

After I deleted MySQL@9 via command `brew uninstall mysql`, the system cannot't find mysql and we receive error message like `mysql: command not found`. In this case, we need to add the path of mysql to `~/.zprofile` or `~/.bash_profile` (depends on which kind of terminal you are using)

Check the installation path of mysql@8.4

`brew --prefix mysql@8.4`

The installation path on my laptop is `/opt/homebrew/opt/mysql@8.4`. Then add the path to `~/.zpprofile`

`export PATH=${PATH}:/opt/homebrew/opt/mysql@8.4/bin`

Don't forget `source ~/.zprofile`

However, when I run `brew services restart mysql@8.4`, although the terminal told me that mysql was running successfully, in fact the mysql didn't run when i checked it using `brew services list`.

**I fixed this issue by deleting /opt/homebrew/var/mysql**

Then uninstall mysql@8.4 and install mysql@8.4





*Summary of Brew Commands*

```bash
brew install mysql@8.4
brew uninstall mysql@8.4
brew services start mysql@8.4
brew services restart mysql@8.4
brew list # list all software installbed by brew
brew services list # check all services is running under brew
brew --prefix mysql@8.4 # check installation path
```

