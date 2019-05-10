---
templateKey: blog-post
title: Solidity当前合约调取一个已部署合约&调取erc20代币合约的方法
date: 2018-12-17T15:04:10.000Z
description: 当前文章中上基于合约接口合约实现，当然也有简单写call，delegatecall的实现
tags:
  - solidity
  - 区块链
  - 以太坊
---

大家知道客户端在调取智能合约时，需要先传递一个ABI接口。这样客户端（例如js）就可以调取智能合约中的方法了。

那么在solidity中如何在当前编写的合约中调取一个已部署的合约呢？也类似，通过声明已部署的合约接口，让当前合约识别老合约。
#### 第一种实现，通过接口调用：
**合约调取合约最小实现案例**
**第一个合约：**
pragma solidity ^0.4.24;
contract Deployed {
    uint public a = 1;
    
    function setA(uint _a) public returns (uint) {
        a = _a;
        return a;
    }
    
}
我们部署它，会得到一个合约地址，假设它是“0xxxxx”

**我们写第二个合约：**
pragma solidity ^0.4.24;

//Deployed合约的接口
interface Deployed {
    function setA(uint) public returns (uint) {}
    function a() public pure returns (uint) {}
    
}

contract Existing  {
	
	Deployed dc;
	
	function Existing(address _t) public {
		dc = Deployed(_t);
	}
 
	function getA() public view returns (uint result) {
		return dc.a();
	}
	
	function setA(uint _val) public returns (uint result) {
		dc.setA(_val);
		return _val;
	}
	
}

如上面的代码，我们先声明了一个已部署合约的接口:
interface Deployed {
	function setA(uint) public returns (uint) {}
	function a() public pure returns (uint) {}
} 

然后就可以在新的合约“Existing”中调用这个合约了。
我们把第二个合约部署时，把第一个合约Deployed的合约地址“0xxxxx”传进来赋值给\_t ，并初始化将第一个合约赋值给dc。我们看到getA,setA分别发生了什么？

然后我们分别调取合约1和合约2，再去比较。

**那么如何用solidity合约调取erc20代币的合约呢？**
比如snt啊，loom啊，knc啊。
首先我有一个名叫loom的erc20token部署在ropsten网络。
loom的详细：
合约地址：0x090652a4aecee28a7ae766c5bd51851830185664
[https://ropsten.etherscan.io/token/0x090652a4aecee28a7ae766c5bd51851830185664]

我们写当前的合约向第一个例子一样，先写erc20token的接口，接着写我们调用的合约：
pragma solidity ^0.4.24;

interface Tokenloom {
  function transfer(address to, uint256 value) external returns (bool success);
}

contract StandardToken{
    function transferloomtoken(uint256 amount){
    	Tokenloom token = Tokenloom(0x090652a4aecee28a7ae766c5bd51851830185664);
        //发送到token
        token.transfer(0xafe28867914795bd52e0caa153798b95e1bf95a1, amount);
        
    }
}

我们将这个合约部署：
同样在ropsten测试网中，得到这个合约地址：0x2C8C3483Be1160A2D89D07708b5477Ea19457255
[https://ropsten.etherscan.io/address/0x2c8c3483be1160a2d89d07708b5477ea19457255]

然后我们转入一笔loom到这个合约地址0x2C8C3483Be1160A2D89D07708b5477Ea19457255

恩，我们看看转账记录：
(img)
[https://ropsten.etherscan.io/tx/0xaa5331f64eb7fee27f88a78254fd5f8772846aa4eb6dcb1c1d6a0eeb786d65da]

接下来，我们调取我们所写的StandardToken合约的transferloomtoken这个方法，神奇的事又发生了：
(img)
[https://ropsten.etherscan.io/tx/0x1c37b517d32db95ebb059e6680882e825a897281965961c0593b862d810800fd]

这种通过接口调用方式是最为推荐的，当然还有第二种：

####  第二种方式：使用call，delegatecall
pragma solidity ^0.4.18;
contract ExistingWithoutABI  {
    
    address dc;
    
    function ExistingWithoutABI(address _t) public {
        dc = _t;
    }
    
    function setA_Signature(uint _val) public returns(bool success){
        require(dc.call(bytes4(keccak256("setA(uint256)")),_val));
        return true;
    }
}
关于call的用法可参考solidity官方文档。


原文地址：[https://medium.com/@blockchain101/calling-the-function-of-another-contract-in-solidity-f9edfa921f4c]


#### 补充loom的教程：与其他合约的交互

*1.定义interface*

如果我们的合约需要和区块链上的其他的合约会话，则需先定义一个 interface (接口)。
先举一个简单的栗子。 假设在区块链上有这么一个合约：
contract LuckyNumber {
  mapping(address => uint) numbers;

  function setNum(uint _num) public {
    numbers[msg.sender] = _num;
  }

  function getNum(address _myAddress) public view returns (uint) {
    return numbers[_myAddress];
  }
}

这是个很简单的合约，您可以用它存储自己的幸运号码，并将其与您的以太坊地址关联。 这样其他人就可以通过您的地址查找您的幸运号码了。
现在假设我们有一个外部合约，使用 getNum 函数可读取其中的数据。
首先，我们定义 LuckyNumber 合约的 interface ：
contract NumberInterface {
  function getNum(address _myAddress) public view returns (uint);
}

请注意，这个过程虽然看起来像在定义一个合约，但其实内里不同：

首先，我们只声明了要与之交互的函数 —— 在本例中为 getNum —— 在其中我们没有使用到任何其他的函数或状态变量。

其次，我们并没有使用大括号（{ 和 }）定义函数体，我们单单用分号（;）结束了函数声明。这使它看起来像一个合约框架。

编译器就是靠这些特征认出它是一个接口的。

在我们的 app 代码中使用这个接口，合约就知道其他合约的函数是怎样的，应该如何调用，以及可期待什么类型的返回值。

在下一节中，我们将真正调用其他合约的函数。目前我们只要声明一个接口，用于调用 CryptoKitties 合约就行了。

*2.使用接口，调用已用合约方法*

继续前面 NumberInterface 的例子，我们既然将接口定义为：
contract NumberInterface {
  function getNum(address _myAddress) public view returns (uint);
}

我们可以在合约中这样使用：
contract MyContract {
  address NumberInterfaceAddress = 0xab38...;
  // ^ 这是FavoriteNumber合约在以太坊上的地址
  NumberInterface numberContract = NumberInterface(NumberInterfaceAddress);
  // 现在变量 `numberContract` 指向另一个合约对象

  function someFunction() public {
    // 现在我们可以调用在那个合约中声明的 `getNum`函数:
    uint num = numberContract.getNum(msg.sender);
    // ...在这儿使用 `num`变量做些什么
  }
}

通过这种方式，只要将您合约的可见性设置为public(公共)或external(外部)，它们就可以与以太坊区块链上的任何其他合约进行交互。

