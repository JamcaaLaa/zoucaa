> 此目录仅限记录学习模块导出

# 此文件存在的背景问题

我在 pnpm + monorepo + ts + scopePackage 的实践中发现一些“模块找不到的问题”。

具体而言，即本仓库的 `zoucaa-page` 包（位于 `$root/pages`）安装了 `$root/packages/hagao` 包后，在 VueSFC 中导入相关模块报模块找不到的问题。

注意，`$root/packages/hagao` 是一个 scope 包，即包名带 scope:

```json
{
  "name": "@jamcaalaa/hagao"
}
```

经实践，想要在 `zoucaa-page` 找到模块，有如下前提：

- `@jamcaalaa/hagao` 包的 `package.json` 需要有 `exports` 字段

为了让默认导出正常，即：

```ts
import {} from '@jamcaalaa/hagao'
```

需要配置：

```json
{
  "name": "@jamcaalaa/hagao",
  "exports": {
    ".": {
      "import": "./src/index.ts"
    }
  }
}
```

改成 `./src/index.js` 也可以，主要是看你用的环境，我后续会改成 js 模块文件，现在均为 ts 环境就没改。

为了让包内其它文件夹导出正常，即本文件夹：

```ts
import {} from '@jamcaalaa/hagao/esm'
```

需要再额外配置：

```json
{
  "name": "@jamcaalaa/hagao",
  "exports": {
    "./esm": "./esm/index.js",
    ".": {
      "import": "./src/index.ts"
    }
  }
}
```

我特意用了 js 和 ts 混用，就是为了说明 `exports` 属性的用法。

> 如果不是 scope 命名，似乎就没有这个问题，请看到这里的朋友自行实践吧

同样的，你需要让调用者找到任何路径（即 `exports` 中的 key），那么就要明确写在 `exports` 字段中，不再举例。