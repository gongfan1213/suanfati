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