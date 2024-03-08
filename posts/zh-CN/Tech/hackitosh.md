---
title: 黑苹果不完全指南
date: 2023-05-07T06:57:00.000Z
summary:  ---    **会进 bios**  **会英语或者翻译**  **有手、耐心**  **需要一
---


---



**会进 bios**

**会英语或者翻译**

**有手、耐心**

**需要一个 U 盘**

## **前言**

本文适合对黑苹果毫无了解的小白。如果你已经买到电脑，想装黑苹果，可以继续阅读。

若你准备买一台可以装黑苹果设备，可参考 [笔记本](https://github.com/daliansky/Hackintosh) [台式机](https://macx.top/18202.html)

本文默认你会科学上网、会使用 GitHub 。

## **前期搜索&明确配置**

黑果的大概启动原理是：修改 config 和 DSDT 来启动 OS X。

明确配置的一会搜索驱动会少很多事，你需要做的就是去搜一下 「机型+EFI」 。

有的话,直接跳到安装部分

你的电脑如果找不到或者太冷门，且也想装黑苹果。就需要自己配 EFI

**配置 EFI**

这是一个 ！大点！

请结合多方信息，

不要只看我的这篇、也不要局限于国内互联网。

**你需要知道的信息**

黑苹果不怎么挑 U，但太老、太偏、AMD，就节约时间不考虑了。上网本（奔腾、赛扬就直接 pass 不得行）

Intel 的集显(HD+一些数字)、AMD 的独立显卡大多都可驱动，这个请搜索 显卡型号+黑苹果”

网卡能驱动上的很少，能驱动的也有各种特殊方法。
具体情况请自行搜索，本文不展开

声卡同理，请自行搜索。

## **下载工作**

~~这里的文件~~~~[参考](https://dortania.github.io/OpenCore-Install-Guide/ktext.html#must-haves)~~~~部分软件~~
请记住他的别称（打在括号里的）

***请将你下载好的文件放在一起，软件请安装。请确保所有的东西你都能找到！***

编辑 plist 配置的[plist 编辑器](https://github.com/corpnewt/ProperTree) 或者[OpenCoreCFG](https://mackie100projects.altervista.org/opencore-configurator/)

必备，下载 release[最简 EFI](https://github.com/acidanthera/OpenCorePkg/releases)

[SSDT](https://github.com/corpnewt/SSDTTime)

diskgeunis(区分工具)百度去下

[Lilu](https://github.com/acidanthera/Lilu/releases)

[VirtualSMC](https://github.com/acidanthera/VirtualSMC/releases)

[WhateverGreen !部分 AMD 的集显不能装！](https://github.com/acidanthera/WhateverGreen/releases)

[AICP 编辑工具](https://acpica.org/downloads/binary-tools)

[写盘工具](https://github.com/balena-io/etcher/releases/download/v1.7.9/balenaEtcher-Setup-1.7.9.exe)

[黑果小兵](https://blog.daliansky.net/)这里下载一个镜像，可以私聊我给你发一个

[排错 1](https://shuiyunxc.gitee.io/2020/04/06/Faults/index/) [排错 2](https://apple.sqlsec.com/10-%E6%8E%92%E9%94%99/)
这里面是常见的黑苹果会遇到的问题，遇到问题了来这看看

*共 10 个文件*

**这里是笔记本的附加部分，台式机请跳过**

~~因为有电池、键盘鼠标等，笔记本用户大多都需要补充这些驱动。当然凡事无绝对，你无法确保有些吃饱没事干，搞特殊~~

这一部分适用于大部分用户，如果这一部分按照广普的教程不行，请百度搜索以下内容：

**所有笔记本用户**。
- SMCProcessor.kext
- SMCSuperIO.kext
- SMCLightSensor.kext
- SMCBatteryManager.kext
- SMCDellSensors.kext(仅限 dell 用户)

*共 4 个(戴尔是 5 个)*

***AMD 用户**** 需要额外补充的驱动*

[AMDProcesser](https://github.com/trulyspinach/SMCAMDProcessor)

[AMDRadeonGPU](https://github.com/aluveitie/RadeonSensor)

*Intel 核显 （也就是整个电脑没有显卡）*

直接用这个[OC 工具箱](https://www.123pan.com/s/rd39-MkpOd)特别省事

*Nvdia*

~~仅支持到 10.13.6~~

[参考](https://www.bilibili.com/video/BV1wr4y1r78X?spm_id_from=333.337.search-card.all.click&vd_source=b2ed1387674e77df3a3f4f6acfe5a846)
这个部分争议较大，且这个技术比较新，又加上我没有 Nvdia 的显卡无法测试

所以英伟达用户请自行测试

*AMD 显卡（独显，如果你是 vega8 这类集显，要么等，要么 C++逆向）*

AMD 显卡要么就是免驱

要么就是仿冒 ID

这一步 AMD 用户可以大喊一声：AMD YES

如果你是 vega8 的用户

且你刚好会 C++，接触过逆向工程。欢迎联系我

声卡部分，由于不同品牌的网卡有不同的驱动方式

有些事注入 ID 就好，有些需要单独加驱动，有些又无法驱动

在此我帮你搜到了全网的大部分声卡驱动，剩下的你自己测试
[声卡](https://radcliffe.vercel.app/post/hei-ping-guo-sheng-qia-qu-dong/)

网卡部分 intel 的看[Intel](https://zhuanlan.zhihu.com/p/299695036)

[其他网卡](https://zhuanlan.zhihu.com/p/339648390)

把你的网卡型号在这里面搜索一下

有你的网卡，你就去对应搜索“型号+黑苹果

**现在，所有的下载工作应该都做完了，你可以稍事休息一下辛苦了，但真正的硬菜马上就来了。少喝酒，多吃菜**

## **配置 EFI**

请按照这个顺序或者你自己不会弄错的顺序来。

请将下载好的文件解压、安装。如果你看到 XXX.kext 这种文件夹，就证明她已经是最简了

请将下载好的文件分好类。

将「最简 EFI」解压到你找到地方

删除 Tools 文件夹下的所有东西

把 Drivers 文件下删得只剩 OpenRuntime.efi 「！仔细理解这句话！」

把[这个](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlus.efi)放在 Drivers 里面

~~这一步的目的是让系统可以控制硬件，软件控制硬件
~~~~[参考](https://www.bilibili.com/read/cv10117507/)~~

1.打开 \***\******SSDT\******\*** 打开里的 \***\******SSDTTime.bat\******\***

2.以「4，3，2」的顺序「顺序不能错」会生成 3 个文件

3.现在我们需要处理下 **SSDT-RTC0.dsl**

没有自动生成就[下载](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-RTC0.dsl)

用文本编辑器之类的打开它，用尽你毕生所学找到

```plain text
External (_SB_.PCI0.LPCB, DeviceObj)

Scope (_SB.PCI0.LPCB)

```

修改成

```plain text
External (_SB_.PCI0.LPC, DeviceObj)

Scope (_SB.PCI0.LPC)

```

4.处理 **SSDT-PMC**
没有就[下载](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-PMC.dsl)

```plain text
External (_SB_.PCI0.LPCB, DeviceObj)

Scope (_SB.PCI0.LPCB)

```

修改为

```plain text
ternal (_SB_.PCI0.LPC, DeviceObj)

Scope (_SB.PCI0.LPC)

```

5.编译
用这个指令
