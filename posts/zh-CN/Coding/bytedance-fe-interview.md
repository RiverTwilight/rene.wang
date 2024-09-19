---
title: 字节飞书前端面经
date: 2024-09-19T04:13:00.000Z
summary:  *2024年八月更新：已经入职啦，欢迎找我内推*  一面大概100分钟，接近两个小时，可能是我比较
---


*2024年八月更新：已经入职啦，欢迎找我内推*

一面大概100分钟，接近两个小时，可能是我比较菜。

面试用的飞书，代码也是在飞书上写。可以提交运行，但是面试官说不建议用多了，因为系统会记录你的提交。

## React 相关

正确执行顺序：

1. render
2. useLayoutEffect
3. commit
4. useEffect



## 代码相关

完整题目忘了，但是有一个陷阱：

```typescript
Promise.resolve().then(() => console.log("2"))
```

编写一个接口，提取出泛型类型。

```typescript
typeA = Promise<number>
typeB = ResolveType<typeA> // number
```

本质上就是 infer 的使用：

```typescript
type ResolveType<T> = T extends Promise<infer U> ? U : T;
```

![Image](/image/post/9cf1b961-e021-4f5a-ba51-5ff5bff2973d_Screenshot_2024-07-30_at_17.33.47.png)

一开始先写了个递归版本，然后引导我：递归层数太多了会怎么样，你遇到过吗？

我说：是的，会超出栈的数量限制。

于是让我不用递归写一个，应该是指用栈来模拟递归：

```typescript
interface TreeNode {
  value: string;
  children?: TreeNode[];
}

const nodes: TreeNode[] = [
  {
    value: "1",
    children: [
      { value: "1-1", children: [{ value: "1-1-1" }, { value: "1-1-2" }] },
      { value: "1-2" },
    ],
  },
  { value: "2" },
  { value: "3" },
];

function renderTree(nodes: TreeNode[]): string {
  let result = '';
  const stack: [TreeNode, number][] = nodes.map(node => [node, 0]);

  while (stack.length > 0) {
    const [node, depth] = stack.pop()!;
    result += Array(depth).fill(" ") + '- ' + node.value + '\n';

    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push([node.children[i], depth + 1]);
      }
    }
  }

  return result.trim();
}

console.log(renderTree(nodes));
```

## 总结

面试官很有水平但是也很亲民，问问题也是层层深入。
