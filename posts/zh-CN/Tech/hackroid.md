---
title: 玩机检查清单
date: 2023-05-07T06:56:00.000Z

---


这几个月陆陆续续刷了好多机，每次都容易忘记一些东西，所以写下这篇文章，以便下次刷机时查阅。

本文长期维护，欢迎你在 Github 上参与维护。

## 离开 MIUI 的缺点
- 相机将被限制在 1200 万像素，目前尚无解决方案。
- 某些定制功能可能无法使用，例如 MIUI 的「双开」功能、杜比音效、按下电源键再解锁等。
- 某些设备可能无法再使用门禁卡。
- 游戏性能可能会下降。

## Root & 刷入 Magisk

Magsik 的工作原理是直接把 API 写入系统的 boot.img 中，其安装方法也就是把已经 Hack 过的镜像重新刷入。Magisk 安装成功后，我们也同时拥有 Root 权限了。

## 解锁 Bootloader

解锁 Bootloader 后将有一定的风险，可能导致数据泄露，请注意。

## 刷入官方 ROM

⚠ 请务必做好设备数据备份，例如照片、联系人、信息等。

## 刷入第三方 Rom

请务必做好设备数据备份，例如照片、联系人、信息等。

这并不是一个很繁杂的操作，请保持冷静、平常心来做。

## 其他资源

这些 app 弥补了类原生系统的一些缺陷，或者增强了其功能。
- 炼妖壶：可以在沙盒中运行一些 app，并且相当于“双开”，例如微信、QQ、支付宝等。
- Shizuku： 应用权限管理
- Thanox：管理后台
- Scene4：场景模式
- Google Camera：安卓平台最强相机

```shell
adb uninstall -k --user 0 com.miui.analytics
adb uninstall -k --user 0 com.miui.analytics.service
adb uninstall -k --user 0 com.miui.bugreport
# 更多包名可自行进入设置查看
```
- 小米设备代号查询：https://miuiver.com/xiaomi-device-codename/
- MIUI 官方下载：https://www.miui.com/download.html
- MIUI 历史版本下载：https://miuiver.com/
- 消除信号栏的感叹号：https://www.evil42.com/index.php/archives/17/
