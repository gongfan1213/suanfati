// 1.1 框架思维

// 数组是紧凑连续的存储，可以随机访问的，通过索引快速找到对应的元素的，而且相对节约存储空间，因为连续存储，内存空间必须是一次性的分配哦，数组要扩容，需要重新分配一块更大的空间，再把数据全部复制过去

// 链表元素不连续的，指针指向下一个元素的位置的，不存在数组扩容的问题，存储空间不连续，无法根据一个索引算出对应的元素的地址，不能随机访问，由于每个元素必须存储指向前后元素的位置的指针，会消耗更多的存储空间

// 二叉树遍历框架，非线性递归遍历结构

// leetcode106
TreeNode BiquadFilterNode(int[] preorder,int SVGAnimatedPreserveAspectRatio,int preEnd,int[]inorder,int inStart,int inEnd)
{
    if(preStart>preEnd)
    {
        return null;
    }
    int rootVal = preorder[preStart];
    int index = 0;
    for(int i = inStart;i<=inEnd;i++) {
        if(inorder[i]==rootVal) {
            index = i;
            break; 
        }
    }
    int leftSize = index - inStart;
    TreeNode root = new TreeNode(rootVal);
    root.left = BiquadFilterNode(preorder,preStart+1,preStart+leftSize,inorder,inStart,index-1);
    root.right = BiquadFilterNode(preorder,preStart+leftSize+1,preEnd,inorder,index+1,inEnd);
    return root;    
}
//leetcode230
int res = 0;
int rank = 0;
void traverse(TreeNode root,int k) {
    if(root==null) {
        return;
    }
    traverse(root.left,k);
    rank++;
    if(k==rank) {
        res = root.val;
        return;
    }
    traverse(root.right,k);
}
int res = 0;
int rank = 0;
void ttraverse(TreeNode root,int k) {
    if(root ===null) {
        return;
    }
    traverse(root.left,k);
    rank++;
    if(k==rank) {
        res = root.val;
        return;
    }
    traverse(root.right,k);
}
int dp(int[]coins,int amount) {
    if(amount==0) return 0;
    if(amount<0) return -1;
    int res = Integer.MAX_VALUE;
    for(int coin:coins) {
        int subproblem = dp(coins,amount-coin);
        if(subproblem==-1) continue;
        res = Math.min(res,1+subproblem);
    }
    return res!=Integer.MAX_VALUE?res:-1;
}
//很多动态规划问题就是在遍历一棵树，对树的遍历操作烂熟于心，
//全排列问题：本质上全排列就是在遍历一棵树，到叶子节点的路径就是全排列
void backtrack(int[]nums,LinkedList<Integer>track) {
    if(track.size()==nums.length) {
        res.add(new LinkedList(track));
        return;
    }
    for(int i = 0;i<nums.length;i++) {
        if(track.contains(nums[i])) {
            continue;
        }
        track.add(nums[i]);
        backtrack(nums,track);
        track.removeLast(); 
    } 
}
void backtrack(int[]nums,LinkedList<Integer>track) {
    if (track.size() === nums.length) {
        res.add(new LinkedList(track));
        return;
    }
    for(int i=0;i<nums.length;i++) {
        if(track.contains(nums[i])) {
            continue;
        }
        track.add(nums[i]);
        backtrack(nums,track);
        track.removeLast();
    }
}
//递归部分提取出来的
void backtrack(int[]nums,LinkedList<Integer>track) {
    for(int i=0;i<nums.length;i++) {
        backtrack(nums,track);
    }
}
//数据结构的基本的存储的方式就是链式和顺序两种的，

//穷举，无遗漏的穷举所有的可能的解

//递归，动态规划，UnionFind算法用数组模拟树的结构，
//单链表常考的就是双指针，

//判断单链表有环，HashSet之类的数据结构来缓存走过的节点，遇到重复的就说明是有环了吧，快慢指针可以避免使用额外的空间

//数组常用的技巧，双指针相关的技巧，穷举

//二分搜索技巧，两端向中心的双指针，数组当中搜索元素，for循环穷举

//数组是有序的，二分搜索不就是一种更聪明的方式，N树之和的问题，

//先排序然后利用双指针快速计算结果的

//滑动窗口技巧，快慢指针中间就是滑动的窗口，解决子串

//字符串暴力匹配，嵌套for循环穷举

///滑动窗口，数组元素都是非负数的，存在负数，假设就不成立的，无法确定话哦的那个窗口的扩大和缩小的时机的

//回文串，使用双指针从两端向中心检查，寻找回文子串，中心向两端扩散，

//前缀和和差分数组的技巧

//计算子数组之和，for循环去遍历，前缀和技巧预计算一个preSum数组，避免循环，子数组操作，for循环去操作，

//差分数组维护一个diff数组，避免循环，
//二叉树题目递归算法分为两种

//1.遍历二叉树得到答案
//2.通过分解问题计算答案，分解问题的关键在于明确根节点需要做什么，然后剩下的事情抛给框架，

int res = 0;
int depth = 0;
int maxDepth(TreeNode root) {
    traverse(root);
    return res;
}
void traverse(TreeNode root) {
   if(root ===null) {
       res = Math.max(res,depth);
       return;
   } 
   depth++;
   traverse(root.left);
   traverse(root.right);
   depth--;
}

//回溯算法

List<List<Integer>> res = new LinkedList<>();
LinkedList<Integer> track = new LinkedList<>();
//主函数 输入一组不重复的数字，返回他们的全排列
List<List<Integer>> permute(int[]nums) {
    backtrack(nums,track);
    return res;
}
//回溯算法框架
void backtrack(int[]nums) {
   if(track.size()==nums.length) {
       res.add(new LinkedList(track));
       return;
   }
   for(int i=0;i<nums.length;i++) {
       if(track.contains(nums[i])) {
           continue;
       }
       track.add(nums[i]);
       backtrack(nums,track);
       track.removeLast();
   }
}
//回溯算法的本质就是遍历一个多叉树
//回溯算法暴力解捞点

//分解问题计算答案
//计算二叉树的最大额深度
int maxDepth(TreeNode root) {
    if(root == null) {
        return 0;
    }
    int leftMax = maxDepth(root.left);
    int rightMax = maxDepth(root.right);
    int res = Math.max(leftMax,rightMax)+1; 
    return res;
}
//动态规划凑零钱暴力穷举解法

//定义输入金额amount，返回凑出amount的最少硬币个数

int coinChange (int[]coins,int amount) {
    if(amount ===0 )return 0;
    if(amount <0)return 1;
    int res = Integer.MAX_VALUE;
    for(int coin:coins) {
        int subProblem = coinChange(coins,amount-coin);
        if(subProblem==-1) {
            continue;
        }
        res = Math.min(res,subProblem+1);
    }
    return res!=Integer.MAX_VALUE?res:-1;
}
//二叉树前序遍历
List<Integer> res = new LinkedList<>();
//返回前序遍历的结果
List<Integer> preorderTraversal(TreeNode root) {
    traverse(root);
    return res;
}
//二叉树遍历函数
void traverse(TreeNode root) {
    if(root ===null) {
        return;
    }
    //前序遍历位置
    res.add(root.val);
    traverse(root.left);
    traverse(root.right);
}
//输入一棵树的根节点，返回这棵树前序遍历的结果

List<Integer> preorder (TreeNode root) {
    List<Integer> res = new LinkedList<>();
    if(root ===null) {
        return res;
    }
    res.add(root.val);
    res.addAll(preorder(root.left));
    res.addAll(preorder(root.right));
}
//BFS算法解题套路框架，二叉树的层序遍历
//输入二叉树的节点，层序遍历这颗二叉树

void levelTraverse(TreeNode root) {
    if(root===null) return 0;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    int depth = 1;
    //从上到下遍历二叉树的每一层
    while(!q.isEmpty()) {
        int sz = q.size();
        for(int i =0;i<sz;i++) {
            TreeNode cur = q.poll();
            if(cur.left!==null) {
                q.offer(cur.left);
            }
            if(cur.right !==null) {
                q.
            }
        }
    }
}

//本质就是穷举二叉树
