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