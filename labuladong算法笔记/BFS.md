# 1.5 BFS算法解题套路框架

读完本节，你不仅学会了算法套路，还可以顺便去 LeetCode 上拿下如下题目：

[102.二叉树的层序遍历](，你不仅学会了算法套路，还可以顺便去 LeetCode 上拿下如下题目：

[102.二叉树的层序遍历](URL_ADDRESScode-cn.com/problems/binary-tree-level-order-traversal)

[433.最小基因变化](URL_ADDRESScode-cn.com/problems/minimum-genetic-mutation)

[559.N叉树的最大深度](URL_ADDRESSleetcode-cn.com/problems/maximum-depth-of-n-ary-tree)

[515.在每个树行中找最大值](URL_ADDRESSleetcode-cn.com/problems/find-largest-value-in-each-tree-row)

DFS算法的核心思想就是**穷举**，而BFS算法的核心思想就是**最短距离**，BFS算法就是从起点开始向四周扩散，遇到终点时停止，不过，一般来说，BFS算法找到的路径不是最短路径，而是离起点最近的最短路径。

BFS的核心思想就是把一些问题抽象成图，从一个点开始，向四周开始扩散。一般来说，我们写BFS算法都是用队列这种数据结构，每次将一个节点周围的所有节点加入队列。

BFS相对DFS的最主要的区别是：BFS找到的路径一定是最短的，但代价就是空间复杂度可能比DFS大很多，不过，DFS的空间复杂度较低。

### 一、算法框架

要说框架，我们先举例一下BFS出现的常见场景好吧，问题的本质就是让你在一幅「图」中找到从起点`start`到终点`target`的最近距离，这个例子听起来很枯燥，但是BFS算法问题其实都是在干这个事儿，把枯燥的本质搞清楚了，再去欣赏各种问题的包装才能胸有成竹嘛。

这个广义的描述可以有各种变体，比如走迷宫，有的格子是围墙不能走，从起点到终点的最短距离是多少？如果这个迷宫带「传送门」可以瞬间传送呢？

再比如说两个单词，要求你通过某些替换，把其中一个变成另一个，每次只能替换一个字符，最少要替换几次？

再比如连连看游戏，两个方块消除的条件不仅仅是图案相同，还得保证两个方块之间的最短连线不能多于两个拐点。你玩连连看，点击两个坐标，游戏是如何判断它俩的最短连线有几个拐点的？

再比如……

其实，这些问题都没啥奇技淫巧，本质上就是一幅「图」，让你从一个起点，走到终点，问最短路径。这就是BFS的本质。

框架搞清楚了直接默写就好，记住下面这个框架就 OK 了：

```js
// 计算从起点 start 到终点 target 的最近距离
int BFS(Node start, Node target) {
    Queue<Node> q; // 核心数据结构
    Set<Node> visited; // 避免走回头路

    q.offer(start); // 将起点加入队列
    visited.add(start);
    int step = 0; // 记录扩散的步数

    while (q not empty) {
        int sz = q.size();
        /* 将当前队列中的所有节点向四周扩散 */
        for (int i = 0; i < sz; i++) {
            Node cur = q.poll();
            /* 划重点：这里判断是否到达终点 */
            if (cur is target)
                return step;
            /* 将 cur 的相邻节点加入队列 */
            for (Node x : cur.adj())
                if (x not in visited) {
                    q.offer(x);
                    visited.add(x);   
                } 
        }  
    }
    step++;

}
```
队列q不用说了，是BFS的核心数据结构；cur.adj()泛指cur相邻的节点，比如说二维数组中，cur上下左右四面的位置就是相邻节点；visited的主要作用是防止走回头路，大部分时候都是必须的，但是像一般的二叉树结构，没有子节点到父节点的指针，不会走回头路就不需要visited。

### 二、二叉树的最小高度

先来一个简单的问题实践一下BFS框架吧，判断一棵二叉树的**最小**高度：力扣111题「二叉树的最小深度」：就是一个比较简答的问题，给你一个二叉树，让你计算它的最小深度。也就是，求根节点到最近叶子节点的最短路径上的节点数量。

怎么套到框架里呢？首先明确一下起点start和终点target是什么，怎么判断到达了终点？

显然起点就是root根节点，终点就是最靠近根节点的那个「叶子节点」嘛，叶子节点就是两个子节点都是null的节点：

```js
if (cur.left == null && cur.right == null)
    // 到达叶子节点
```

那么，按照我们上述的框架稍加改造来写解法吧：

```js
int minDepth(TreeNode root) {
    if (root == null) return 0;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    // root 本身就是一层，depth 初始化为 1
    int depth = 1;

    while (!q.isEmpty()) {
        int sz = q.size();
        /* 将当前队列中的所有节点向四周扩散 */ 
        for (int i = 0; i < sz; i++) {
            TreeNode cur = q.poll();
            /* 判断是否到达终点 */
            if (cur.left == null && cur.right == null)
                return depth;
            /* 将 cur 的相邻节点加入队列 */
            if (cur.left != null)
                q.offer(cur.left); 
        } 
        depth++;
    } 
    return depth;
}
```
这里注意一下while循环和for循环的配合，用一个sz变量记录当前层的节点数，把这一层的节点都遍历完之后就进入下一层，这样就实现了层序遍历，depth变量也就可以在这个for循环外部进行递增。

1.为什么BFS可以找到最短距离，DFS不行吗？

首先，你看BFS的逻辑，depth每增加一次，队列中的所有节点都向前迈一步，这保证了第一次到达终点的时候，走的步数是最少的。

DFS不能找到最短路径吗？其实也是可以的，但是时间复杂度相对高很多。你想啊，DFS实际上是靠递归的堆栈记录走过的路径，你要找到最短路径，肯定得把二叉树中所有树杈都探索完才能对比出最短的路径有多长对不对？而BFS借助队列做到一次一步「齐头并进」，是可以在不遍历完整棵树的条件下找到最短距离的。如果情况复杂一些，比如遍历图结构，遍历的过程当中需要visited数组来标记已经走过的节点，防止走回头路，BFS就比DFS更有优势。

形象点说，DFS是线，BFS是面；DFS是单打独斗，BFS是集体行动。这个应该比较容易理解吧。


2.既然BFS那么好，为啥Dfs还要存在？

BFS可以找到最短距离，但是空间复杂度高，而DFS的空间复杂度较低。

还看前面处理二叉树的例子，假设给你的这个二叉树是满二叉树，节点数为N，对于DFS算法来说，空间复杂度无非就是递归堆栈，最坏情况下顶多就是树的高度，也就是O(logN)。

但是你想想BFS算法，队列中每次都会储存着二叉树一层的节点，这样的话最坏情况下空间复杂度应该是树的最底层节点的数量，也就是N/2，用 Big O 表示的话也就是O(N)。

另一个主要的原因是DFS算法的代码好写，两句递归函数就能遍历整颗二叉树，还不容易出错，如果写BFS蒜贩，就得多写很多代码，容易出错。

由此观之，BFS还是有代价的，一般俩说在找最短路径的时候使用BFS，其他时候还是DFS使用得多一些（主要是递归代码好写）。

### 三、解开密码锁的最少次数

这是力扣第752题「打开转盘锁」，题目如下：

你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有10个数字：'0', '1', '2', '3', '4', '5', '6', '7', '8', '9' 。每个拨轮可以自由旋转：例如把 '9' 变为 '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。
锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。

列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。

字符串 target 代表可以解锁的数字，你需要给出最小的旋转次数，如果无论如何不能解锁，返回 -1。

请你写一个算法，计算从初始状态'0000'到解锁状态target所需要的最小旋转次数。如果无法拨出target，返回-1。

函数签名如下：

```js
int openLock(String[] deadends, String target)
```

比如说输入如下：
```
deadends = ["0201","0101","0102","1212","2002"], target = "0202"
```
算法应该返回 6，因为可能的移动序列为 "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202"。

比如从0000开始，转一下，可以穷举出如下几种密码：

1000、9000、0100、0900、0010、0090、0001、0009，

然后，再从这八种密码中，继续穷举，直到找到deadends或者找到target。

仔细想想这可以抽象成一幅图，每个节点有8个相邻的节点，又让你求最短距离，这不就是典型的BFS嘛，框架就可以派上用场了，先写出一个「简陋」的BFS框架代码再说别的：

```js
// 将 s[j] 向上拨动一次
String plusOne(String s, int j) {
    char[] ch = s.toCharArray();
    if (ch[j] == '9')
        ch[j] = '0';
    else
        ch[j] += 1;
    return new String(ch);
}
// 将 s[i] 向下拨动一次
String minusOne(String s, int j) {
    char[] ch = s.toCharArray();
    if (ch[j] == '0')
        ch[j] = '9';
    else
        ch[j] -= 1;
    return new String(ch);
}

// BFS 框架，打印出所有可能的密码
void BFS(String target) {
    Queue<String> q = new LinkedList<>();
    q.offer("0000");

    while (!q.isEmpty()) {
        int sz = q.size();
        /* 将当前队列中的所有节点向周围扩散 */
        for (int i = 0; i < sz; i++) {
            String cur = q.poll();
            /* 判断是否到达终点 */
            System.out.println(cur); 
            /* 将一个节点的相邻节点加入队列 */
            for (int j = 0; j < 4; j++) {
                String plus = plusOne(cur, j);
                String minus = minusOne(cur, j);
                q.offer(plus);
                q.offer(minus);
            }
        }  
    } 
}
```
这段BFS代码已经能够穷举所有可能的密码组合了，但是显然不能完成题目，有如下问题需要解决：

1、会走回头路。比如说我们从"0000"拨到"1000"，但是等从队列拿出"1000"时，还会拨出一个"0000"，这样的话会产生死循环。

2、没有终止条件，按照题目要求，我们找到target就应该结束并返回拨动的次数。

3、没有对deadends的处理，按道理这些「死亡密码」是不能出现的，也就是说你遇到这些密码的时候需要跳过。

如果你能够看懂上面那段代码，真得给你鼓掌，只要按照 BFS 框架在对应的位置稍作修改即可修复这些问题：

```js
int openLock(String[] deadends, String target) {
    // 记录需要跳过的死亡密码
    Set<String> deads = new HashSet<>();
    for (String s : deadends) deads.add(s);
    // 记录已经穷举过的密码，防止走回头路
    Set<String> visited = new HashSet<>();
    Queue<String> q = new LinkedList<>();
    // 从起点开始启动广度优先搜索
    int step = 0;
    q.offer("0000");
    visited.add("0000");

    while (!q.isEmpty()) {
        int sz = q.size();
        /* 将当前队列中的所有节点向周围扩散 */  
        for (int i = 0; i < sz; i++) {
            String cur = q.poll();

            /* 判断是否到达终点 */
            if (deads.contains(cur))
                continue; 
            if (cur.equals(target))
                return step;

            /* 将一个节点的未遍历相邻节点加入队列 */
            for (int j = 0; j < 4; j++) {
                String plus = plusOne(cur, j);
                if (!visited.contains(plus)) {
                    q.offer(plus);
                    visited.add(plus);
                }
                String minus = minusOne(cur, j);
                if (!visited.contains(minus)) {
                    q.offer(minus);
                    visited.add(minus);
                } 
            }
        }   
        /* 在这里增加步数 */
        step++;
    } 
    // 如果穷举完都没找到目标密码，那就是找不到了
    return -1;
}
```
至此，我们就解决了这道题目。还有一个比较小的优化，就是可以不需要dead集合，可以直接在visited集合中判断是否访问过就可以了。

因为你可以想象，所有的deadend都是连在一起的，也就是说，你无论怎么转，都转不到deadend对吧？

如果你对这个问题感兴趣的话，可以用一个双向BFS的思路来优化一下，篇幅所限，这里就不写了，有兴趣的读者可以自行搜索。

# 1.5.4 双向BFS优化

区别: 传统的BFS框架就是从起点开始向四周扩散，遇到终点时停止；而双向BFS框架是从起点和终点同时开始扩散，当两边有交集的时候停止。

为什么这样能够能够提升效率呢？其实从 Big O 表示法分析算法复杂度的话，它俩的最坏复杂度都是O(N)，但是实际上双向BFS的最短距离肯定比传统BFS的路径短啊，这就是为什么双向BFS比传统BFS高效的原因。

图中的树形结构，如果终点在最底部，按照传统BFS的策略，会把整棵树的节点都搜索一遍，最后找到target；而双向BFS其实只遍历了半棵树就出现了交集，也就是找到了最短距离。

不过双向BFS也有局限，因为你必须知道终点在哪里。

比如我们刚才讨论的二叉树最小高度的问题，你一开始根本就不知道终点在哪里，也就无法使用双向BFS；但是第二个密码锁的问题，是可以使用双向BFS算法来提高效率的，代码稍加修改即可：

```js
int openLock(String[] deadends, String target) {
    Set<String> deads = new HashSet<>();
    for (String s : deadends) deads.add(s);
    // 用集合不用队列，可以快速判断元素是否存在
    Set<String> q1 = new HashSet<>();
    Set<String> q2 = new HashSet<>();
    Set<String> visited = new HashSet<>();

    int step = 0;
    q1.add("0000");
    q2.add(target);

    while (!q1.isEmpty() && !q2.isEmpty()) {
        // 哈希集合在遍历的过程中不能修改，用 temp 存储扩散结果
        Set<String> temp = new HashSet<>();

        /* 将 q1 中的所有节点向周围扩散 */
        for (String cur : q1) {
            /* 判断是否到达终点 */
            if (deads.contains(cur))
                continue;
            if (q2.contains(cur))
                return step;
            visited.add(cur);

            /* 将一个节点的未遍历相邻节点加入集合 */
            for (int j = 0; j < 4; j++) {
                String plus = plusOne(cur, j);
                if (!visited.contains(plus))
                    temp.add(plus);
                String minus = minusOne(cur, j);
                if (!visited.contains(minus))
                    temp.add(minus); 
            } 
        }  
        /* 在这里增加步数 */
        step++;
        // temp 相当于 q1
        // 这里交换 q1 q2，下一轮 while 就是扩散 q2
        q1 = q2;
        q2 = temp;
    } 
    return -1;
}
```
双向BFS还是遵循 BFS 算法框架的，只是不再使用队列，而是使用 HashSet 方便快速判断两个集合是否有交集。

另外的一个技巧点就是 while 循环的最后交换 q1 和 q2 的内容，所以只要默认扩散 q1 就相当于轮流扩散 q1 和 q2。

其实双向 BFS 还有一个优化，就是在 while 循环开始时做一个判断：
```js
// ...
while (!q1.isEmpty() && !q2.isEmpty()) {
    if (q1.size() > q2.size()) {
        // 交换 q1 和 q2
        temp = q1;
        q1 = q2;
        q2 = temp;
    }
        // ...
}
```
为什么这是一个优化呢？

因为按照 BFS 的逻辑，队列（集合）中的元素越多，扩散之后新的队列（集合）中的元素就越多；在双向 BFS 算法中，如果我们每次都选择一个较小的集合进行扩散，那么占用的空间增长速度就会慢一些，效率就会高一些。

不过话说回来，无论传统 BFS 还是双向 BFS，无论做不做优化，从 Big O 衡量标准来看，时间复杂度都是一样的，只能说双向 BFS 是一种 trick，算法运行的速度会相对快一点，掌握不掌握其实都无所谓。最关键的是把 BFS 通用框架记下来，反正所有 BFS 算法都可以用它套出解法。