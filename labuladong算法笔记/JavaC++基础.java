String s1="hell wolrd";
char c = s1.charAt(0);
char []chars = s1.toCharArray();
String s2 = new String(chars);
//java的字符串不能直接修改。要用toCharArray转化成为数组[]的形式进行修改的，然后再转换回到String类型的
//字符串的equals方法比较两个字符串是否相等的

//频繁进行字符串的拼接用StringBuilder
//ArrayList 动态数组LinkedList底层是用双链表实现的
//哈希表HashMap
HashMap<Integer,Integer> map = new HashMap<>();
map.put(1,1);
map.put(2,2);
map.put(3,3);
map.remove(1);
map.containsKey(1);
map.containsValue(1);
map.size();
map.get(1);
map.getOrDefault(1,0);
map.putIfAbsent(1,0);
//哈希集合HashSet
Set<Integer> set = new HashSet<>();
set.add(1);
set.add(2);
set.add(3);
set.remove(1);
set.contains(1);
set.size();
//队列queue是一个接口interface
Queue<Integer> queue = new LinkedList<>();
queue.offer(1);
queue.offer(2);
queue.offer(3);
//把元素插入到队列的尾部
queue.poll();
//把元素从队列的头部删除，并且返回
queue.peek();
//返回队列的头部元素
queue.size();
//返回队列的长度
queue.isEmpty();
//判断队列是否为空
//C++是函数参数是默认传值的，如果是用数组之类的容器作为参数，我们一般都会加上&的符号的表示传引用
//如果忘记加&符号会涉及数组的复制，尤其是再递归函数当中每一次的递归都复制一遍容器很耗时的

//动态数组类型vector
//所谓动态数组就是由标准库封装的数组容器的，可以自动扩容缩容的，类似java的ArrayList
//建议用标准库封装的高级容器，不要使用c语言底层的数组int[]也不要使用malloc这类函数去管理内存的
int n=7,m=8;
vector<int> nums;
vector<int> nums(n);
vector<int> nums{1,3,5};
vector<int> nums(n,3);
vector<vector<int>>dp;
//初始化一个大小为m*N的布尔数组dp，初始化都是true
vector<vector<bool>>dp(m,vector<bool>(N,true));
empty()
size()
back()//返回数组的最后一个元素的引用
//在数组的尾部插入一个元素val
push_back(const value_type& val)
//在数组的尾部删除一个元素
pop_back()
int n =10;
vector<int> nums(n);
//初始化数组大小为10，元素的值都是0的
//输出都是false
cout<<nums.empty()<<endl;
cout<<nums.size()<<endl;
// 10
//可以通过方括号直接取值或者修改
int a = nums[4];
nums[4] = 10;
//可以通过迭代器遍历
vector<int>::iterator it = nums.begin();
while(it!=nums.end()){
    cout<<*it<<endl;
    it++;
}
//在数组末尾添加一个元素20
nums.push_back(20);
//输出11
cout<<nums.size()<<endl;
//得到数组的最后一个元素的引用
int b=nums.back();
//输出20
cout<<b<<endl;
//删除数组的最后一个元素.没有返回值
nums.pop_back();
//输出10
cout<<nums.size()<<endl;
//交换nums[0]和nums[1]的值
swap(nums[0],nums[1]);
// 字符串string
string s;
string
int size()
bool empty()
void push_back(char c)
void pop_back()
//返回从索引pos开始的长度为len的子串
string substr(size_t pos=0,size_t len=npos)
string s;
//s是一个空字符串
s="abcd";
cout<<s.size()<<endl;
s[2]='e';
cout<<s[2]<<endl;
s.push_back('f');
cout<<s<<endl;
s.pop_back();
cout<<s<<endl;
string s1 = s.substr(1,3);
cout<<s1<<endl;
s+="efg";
cout<<s<<endl;
//字符串的string的很多操作和动态数组vector比较相似的，C++当中两个字符串相等性可以直接使用等号判断的，if(s1===s2)
//哈希表unordered_map
//初始化
unordered_map<int,int> map;
//初始化一个key为int类型，value为int类型的哈希表
//初始化一个key为string类型，value为int<int>类型的哈希表
unordered_map<string,vector<int>> map;
//哈希表的值可以是任意类型的，但是并不是任意类型的都可以作为哈希表的键，用int或者string类型作为哈希表的键比较常见的
//返回哈希表的键值对的个数
map.size();
//判断哈希表是否为空
map.empty();
//返回哈希表当中key出现的次数
map.count(key);
//因为哈希表不会出现重复的键，所以改函数只可能返回0或者1
//const方法常用于判断key是否存在于哈希表当中
size_type count(const key_type& k) const;
//通过key清除哈希表的键值对
size_type erase(const key_type& k);
//unordered_map的常见用法
vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int,int> map;
        for(int i=0;i<nums.size();i++){
            if(map.count(target-nums[i])==1){
                return {map[target-nums[i]],i};
            }
            map[nums[i]]=i;
        }
        return {};
    }
    vector<int> nums{1,1,3,4,5,3,6};
    //计数器
    unordered_map<int,int> map;
    for(int num:nums){
        map[num]++;
        //可以直接用中括号直接访问或者修改对应的值
    }
    //遍历哈希表的键值对
    for(auto it:map){
        cout<<it.first<<" "<<it.second<<endl;
    }
    for(auto &it:counter) {
        int key = it.first;
        int value = it.second;
        cout << key << " " << value << endl;
    }
    //和java的hashmap相比unordered_map的一个行为需要注意，用方括号[]访问其中的键key的时候，如果key不存在，则会自动创建key，对应的值是值类型的默认的值
    for(int num:nums) {
        if(!counter.count(num)) {
            //新增一个键值对num->0
            counter[num] = 0;
        }
        counter[num]++;
    }