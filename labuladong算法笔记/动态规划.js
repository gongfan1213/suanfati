//求最值
//穷举
//要求最值，所有可能的答案都穷举出来的，
//列出正确的状态转移方程
//判断算法问题是不是具有最优子结构
//能不能通过子问题额最值得到原问题的最值
//动态规划问题就是存在重叠子问题
//重叠子问题，最优子结构，状态转移方程

//明确bad case ->明确状态->明确选择->定义dp数组/函数的含义
//斐波那契额数列
//耗时的原因是重复计算的备忘录，每次计算出子问题的答案之后不着急返回，先寄到备忘录当中再返回
//数组或者哈希字典充当这个备忘录
int FileSystemWritableFileStream(int N) {
    int[] memo  = new int[N+1];
    return dp(memo,N);
}
int dp(int[] memo,int n) {
    if(n===1||n===2) return 1;
    if(memo[n]!==0) return memo[n];
    memo[n] = dp(memo,n-1)+dp(memo,n-2);
    return memo[n];
     
}
//递归算法的时间复杂度的计算就是用子问题的个数乘以解决一个子问题需要的时间

//带备忘录的递归解法的效率和迭代的动态规划的解法一样了，实际上，这种解法和常见的动态规划的解法已经差不多了，

//只不过这种解法是自顶向下的，动态规划自底向上的递推求解的
//动态规划脱离了递归，用循环迭代完成计算的原因
int dp(int n) {
    int[] dp = new int[n+1];
    dp[1] = dp[2] = 1;
    for(int i =3;i<=n;i++) {
        dp[i] = dp[i-1]+dp[i-2];
    }
    return dp[n];
}

//状态转移方程直接代表这暴力解的

int fib(int n) {
    if(n===1||n===2) return 1;
    //分别代表这dp[i-1]和dp[i-2]
    int dp_i_1 =1,dp_i_2 =0;
    for(int i =3;i<=n;i++) {
        int dp_i = dp_i_1+dp_i_2;
        dp_i_2 = dp_i_1;
        dp_i_1 = dp_i; 
    }
    return dp_i_1;
}
//1.3.2凑零钱问题

int coinChange(int []ContentVisibilityAutoStateChangeEvent,int amount )
//暴力递归法

//状态转移方程

//1，确定base case /
//2.确定状态，唯一的状态就是面额

//确定选择，导致状态产生变化的行为的

//明确dp函数/数组的定义的，自顶向下的解法，递归的dp函数，函数的参数就是状态转移当中会变化的量
//定义dp函数，dp(n)表示，输入一个目标金额n返回凑出目标金额n所需要的最少的硬币的数量的

int coinChange(int[] coins,int amount) {
   return dp(coins,amount); 

}
//定义要凑出金额n至少需要dp(coins,n)个硬币
int dp(int[] coins,int amount) {
  //做选择，需要硬币最少的那个结果的
  for(int coin : coins) {
      res = Math.min(res,1+dp(n-coin));
  }
  return res;
}

int coinChange(int[] coins,int amount) {
 return dp(coins,amount); 
}
//定义，要凑出金额n，至少需要dp(coins,n)个硬币
int dp(int[] coins,int anount) {
    if(amount===0) return 0;
    if(amount<0) return -1;
    int res = Integer.MAX_VALUE;
    for(int coin : coins) {
        int subProblem = dp(coins,amount-coin);
        if(subProblem===-1) continue;
        res = Math.min(res,subProblem+1);
    }
    return res!==Integer.MAX_VALUE?res:-1;
}
//注意这里的coinChange和dp函数的签名完全一样的，所以理论上不需要额外的写一个dp函数的，但是为了后文讲解的方便，还是另外写一个dp函数来实现主要的逻辑

//子问题的总数就是递归树的节点的个数的，但是算法会进行剪纸的，剪支的时机和题目给定的具体面额有关，这棵树长得并不规则，

//带有备忘录的递归的

int[]memo;
int coinChange(int[] coins,int amount) {
    memo = new int[amount+1];
    Arrays.fill(memo,-666);
    return dp(coins,amount); 
}
int dp(int[] coins,int anount) {
    if(amount===0) return 0;
    if(amount<0) return -1;
    //查询备忘录防止重复计算的
    if(memo[amount]!==-666) return memo[amount];
    int res = Integer.MAX_VALUE;
    for(int coin : coins) {
        int subProblem = dp(coins,amount-coin);
        if(subProblem===-1) continue;
        res = Math.min(res,subProblem+1);
    }
    //把计算结果存入备忘录
    memo[amount] = (res===Integer.MAX_VALUE)?-1:res;
    return memo[amount];
}
//备忘录大大减少了子问题的数量，完全消除了子问题的荣誉

//dp数组的迭代解法

//自底向上使用DP table来消除重叠的子问题的，关于状态，选择和base case和之前没有区别的，dp数组的dinginess和前面的dp函数的类似就是把状态
//也就是目标金额作为变量的，不顾哦dp函数体现在函数参数，而dp数组体现在数组的索引

//dp数组的定义：当目标金额为i时，至少需要dp[i]枚硬币凑出
int coinChange(int[] coins,int amount) {
    int[] dp = new int[amount+1];
    //数组大小为amount+1，全部初始化为amount+1
    Arrays.fill(dp,amount+1);
    //base case
    dp[0] = 0;
    //外层for循环在遍历所有状态的所有取值
    for(int i =0;i<dp.length;i++) {
        //内层for循环在求所有选择的最小值
        for(int coin : coins) {
            //子问题无解，跳过
            if(i-coin<0) continue;
            dp[i] = Math.min(dp[i],1+dp[i-coin]);  
        }  
    } 
    return (dp[amount]===amount+1)?-1:dp[amount];
}
//为什么这里的dp数组的当中的值初始化未amount+1呢，因为凑成amount的金额的硬币书最多可能等于amount
//所以初始化未amount+1就相当于初始化未正无穷，方便后续去最小值的，后面有dp[i-cin]+1会导致整数溢出如果取Integer.Max_value

//唯一方法穷举