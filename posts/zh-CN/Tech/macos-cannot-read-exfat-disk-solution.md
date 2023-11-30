---
title: macOS 无法读取 exFAT 硬盘解决方案
date: 2023-11-30T03:02:00.000Z

---


昨天把移动硬盘插上Mac，发现竟然无法读取，而磁盘工具显示为“未挂载”。

![Image](https://prod-files-secure.s3.us-west-2.amazonaws.com/4eed8d0c-48f7-4215-be40-7d7c2c312228/f46f3130-b9a6-4c9d-9597-6db9171d19af/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231130T130544Z&X-Amz-Expires=3600&X-Amz-Signature=6bca547e3694d530473dbc6fa875cd0cb16df7e16ce833a1c38a2a4e72140763&X-Amz-SignedHeaders=host&x-id=GetObject)

查阅资料后发现，这种情况通常是由于没有正确推出 exFAT 格式磁盘导致的。试了很多种解决方案，终于在一个 gist 页面（的评论区）找到了可行的。

首先，确保硬盘连接了Mac，在终端输入以下命令：

```bash
diskutil list
```

这会获取一个磁盘列表。找到你的磁盘，记住硬盘的 ID。比如我的是 disk8s1。

![Image](https://prod-files-secure.s3.us-west-2.amazonaws.com/4eed8d0c-48f7-4215-be40-7d7c2c312228/41c64722-27c2-49c6-af05-e390d1b0721d/Screenshot_2023-11-30_at_10.46.27.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231130T130544Z&X-Amz-Expires=3600&X-Amz-Signature=6c456aacf9d7db998b5c3c41c2831c335e638f72dd5c7b284f51a0f6a3a47581&X-Amz-SignedHeaders=host&x-id=GetObject)

接着输入这个命令，其中 ID 是你刚刚记住的数字：

```bash
sudo ps -ax | grep <ID>
```

你会得到一个新的 ID，例如：

```bash
65633 ??         0:00.96 /System/Library/Filesystems/exfat.fs/Contents/Resources/./fsck_exfat -y /dev/rdisk8s1
65825 ttys000    0:00.00 grep disk8s1
```

记住后面有两个？的PID，最后杀死这个进程：

```bash
sudo kill -9 65633
```

会有弹窗提示你硬盘有问题，但此时你已经可以读取硬盘数据了。

最后，进入磁盘工具，执行硬盘急救，硬盘恢复如初。

![Image](https://prod-files-secure.s3.us-west-2.amazonaws.com/4eed8d0c-48f7-4215-be40-7d7c2c312228/b6176221-57be-4dca-a5f2-c2a869ca5950/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20231130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231130T130544Z&X-Amz-Expires=3600&X-Amz-Signature=049d6a97c7f2adb46fd5c6274e6408e712c45e89f62c214013e7eb5034ac2c86&X-Amz-SignedHeaders=host&x-id=GetObject)

为避免这个情况再次发生，务必记得正确推出 exFAT 格式的磁盘，而不是硬插拔。
