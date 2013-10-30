
var app = angular.module('app',  ['ui.bootstrap']);

//page controller
app.controller('PageCtrl', function($scope){
  
  //Variables
  $scope.currentPage = 0;
  $scope.finished = false;
  $scope.pageCopy = [
    {
      copy: [
        { line: "You are a participant in an experiment on selective attention. Click play to see three rapid streams of words in the box below. Your task is:" },
        { line: "BE SURE THAT YOU ATTEND TO THE MIDDLE STREAM ONLY, SO YOU DON'T MISS ANY OF THE WORDS IN IT."  },
        { line: "To ensure that you attend to every word in the middle stream, you should shadow the words silently in your mind as they go by. You can replay the streams as many times as you like. When you feel confident that you have carried out this task successfully, click finished"  }
      ]
    },
    {
      copy: [
        { line: "Did you notice anything in the top and bottom streams?" },
        { line: "Experiments like this are typically carried out with auditory stimuli (streams of spoken words), not visual stimuli. And typically, participants notice very little in the unattended streams."  },
        { line: "In this case, some of the words in the unattended streams were words from a foreign language, words from a nursery rhyme, or not even words at all. Click REPLAY to see how easy it is to notice these features if you aren't attending elsewhere and how difficult it is if you're attending to the middle stream. Click SHOW THE STIMULI to see the streams in full."  }
      ]
    },
    {
      copy: [
        { line: "Now try another trial. Click PLAY to present the stimuli. Remember:" },
        { line: "BE SURE THAT YOU ATTEND TO THE MIDDLE STREAM ONLY, SO YOU DON'T MISS ANY OF THE WORDS IN IT."  },
        { line: "When you feel confident that you have carried out this task successfully, click FINISHED."  }
      ]
    },
    {
      copy: [
        { line: "In this trial, the top and bottom streams contained some emotionally charged words. Did you notice any of them?" },
        { line: "Click REPLAY to try again—still attending to the middle stream—and see if you notice these words."  },
        { line: "Click SHOW THE STIMULI to see the streams in full."  }
      ]
    }
  ];
  $scope.currentPageCopy = $scope.pageCopy[0];

  //functions
  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };
  
  //change page
  $scope.change= function($targetPage, $window) {
    if($window)
    {
      if($scope.currentPage == 0)
      {
        $scope.updateHeader($scope.currentPage);
        $scope.currentPage = $targetPage;
      }
      else
      {
        return false;
      }
    }
    else if (!$window)
    {
      $scope.currentPage = $targetPage;
    }
  }
  
  //test finished
  $scope.setFinish = function(b){
    $scope.finished = b;
  }
  
  //next page
  $scope.nextPage= function(){
    if(!$scope.finished)
      $scope.currentPage++;
    else
      $scope.currentPage+=2;
    
    if($scope.currentPage == 4)
    {
      $scope.setFinish(true);
    }
    $scope.change($scope.currentPage);
  }
  
  //previous page
  $scope.prevPage= function(){
    $scope.currentPage--;
    $scope.change($scope.currentPage);
  }
  
  //update the copy in the header
  $scope.updateHeader = function($index) {
    $scope.currentPageCopy = $scope.pageCopy[$index];
  }
});

//Controller for actual test
app.controller('TestCtrl', function($scope) {
  //Variables
  $scope.test1 = {
    list1: [{word:"dot"}, {word:"table"}, {word: "pencil"}, {word: "tree"}, {word: "proom"}, {word: "bike"}, {word: "amigo"}, {word: "dog"}, {word: "mafer"}, {word: "lamp"}, {word: "drink"}, {word: "mary"}, {word: "had"}, {word: "a"}, {word: "little"}, {word: "lamb"}, {word: "polit"}, {word: "floor"}, {word: "letter"}],
    list2: [{word:"there"}, {word:"is"}, {word:"much"}, {word:"to"}, {word:"be"}, {word:"learned"}, {word:"from"}, {word:"the"}, {word:"very"}, {word:"interesting"}, {word:"information"}, {word:"that"}, {word:"is"}, {word:"being"}, {word:"presented"}, {word:"in"}, {word:"the"}, {word:"middle"}, {word:"stream"}],
    list3: [{word:"tark"}, {word:"choice"}, {word:"madre"}, {word:"blend"}, {word:"cube"}, {word:"klipe"}, {word:"green"}, {word:"little"}, {word:"miss"}, {word:"muffet"}, {word:"umbrella"}, {word:"week"}, {word:"bird"}, {word:"try"}, {word:"zink"}, {word:"polite"}, {word:"if"}, {word:"bonjour"}, {word:"trunk"}]
  };
  
  $scope.test2 = {list1: [{word:"jump"}, {word:"ball"}, {word: "glass"}, {word: "murder"}, {word: "chair"}, {word: "paper"}, {word: "danger"}, {word: "food"}, {word: "clock"}, {word: "hate"}, {word: "book"}, {word: "plate"}, {word: "sex"}, {word: "case"}, {word: "horror"}, {word: "phone"}, {word: "hell"}, {word: "phony"}, {word: "relative"}],
    list2: [{word:"even"}, {word:"when"}, {word:"carefully"}, {word:"attending"}, {word:"to"}, {word:"just"}, {word:"the"}, {word:"middle"}, {word:"stream"}, {word:"people"}, {word:"sometimes"}, {word:"notice"}, {word:"emotionally"}, {word:"charged"}, {word:"words"}, {word:"in"}, {word:"the"}, {word:"other"}, {word:"stream"}],
    list3: [{word:"feeble"}, {word:"red"}, {word:"love"}, {word:"thud"}, {word:"grass"}, {word:"kill"}, {word:"face"}, {word:"grave"}, {word:"funny"}, {word:"museum"}, {word:"iron"}, {word:"help"}, {word:"quiet"}, {word:"file"}, {word:"pain"}, {word:"shoe"}, {word:"away"}, {word:"scream"}, {word:"fire"}]
  };

  $scope.test = 1;
  $scope.myInterval;
  
  //Start the streams
  $scope.startTest= function() {
    $scope.isplaying = true;
    $scope.complete = false;
    if($scope.test == 1)
    {
      $scope.stimuliList = $scope.test1; 
    }else
    { 
      $scope.stimuliList = $scope.test2;
    }     
    
    $i = 0;
    $scope.list1 = '+';
    $scope.list2 = '+';
    $scope.list3 = '+';
    setTimeout(function(){
      $scope.myInterval=setInterval(function(){
        $scope.list1 = $scope.stimuliList.list1[$i]['word'];
        $scope.list2 = $scope.stimuliList.list2[$i]['word'];
        $scope.list3 = $scope.stimuliList.list3[$i]['word'];
        $i++;
        if($i == $scope.stimuliList.list1.length)
        {
          $scope.stopTest();
          $scope.complete = true;
        }
        $scope.safeApply();
      },200);
    }, 1000);
        
    $scope.not_started=false;
    return false;
  }
  
  //stop the test
  $scope.stopTest = function() {
    clearInterval($scope.myInterval);
    if($scope.test==1)
    {
      $scope.updateHeader(1);
    }else if($scope.test==2)
    {
      $scope.updateHeader(3);
    }
    $scope.isplaying = false;
  }
  
  //initialise test and variables
  $scope.initTest= function(test) {
    if(test)
    {
      if(test==2)
      {
        $scope.updateHeader(test);
      }
    }
    $scope.stimuli = false;
    $scope.replay = false;
    $scope.isplaying = false;
    $scope.complete = false;
    $scope.list1='(ignore)';
    $scope.list2='(attend)';
    $scope.list3='(ignore)';  
  }
  
  //finish test
  $scope.finishTest=function(){
    $scope.test++;
    if($scope.test>2)
    {    
      $scope.nextPage();
    }
    else
      $scope.initTest($scope.test);
  }
  
});

//Controller for Questionnaire
app.controller('QuestionCtrl', function($scope, $modal){
  //Variables
  $scope.currentQuestion = 1;
  $scope.currentAnswer;
  $scope.userFeedback= 'jello';
  $scope.questions = [
    {
      id: '1',
      question: 'Which of the following questions expresses the cocktail party problem?',
      options: 
      [
        { 
          option:  "A. How can you pay attention to what the actors in a play are saying if the people seated next to you in the audience are talking?",
          id: 'A'
        },  
        { 
          option:  "B. How can you hear what your friend is saying during a noisy fireworks display?",
          id: 'B'
        },
        { 
          option:  "C. Can you figure out what the TV newsperson is saying if the sound keeps going off and on?",
          id: 'C'
        },
        { 
          option:  "D. Did you hear something, or are you just imagining things?",
          id: 'D'
        }  
      ],
      answer: 'A',
      answers:
      {
        A: 'Correct!',
        B: 'Sorry. The correct answer is A. Click EXPLAIN if you want to review this topic.',
        C: 'Sorry. Often we do notice salient stimuli, like our name, in unattended converstions. The correct answer is A. Click EXPLAIN if you want to review this topic.',
        D: 'Sorry. Typically we can recall very little about what occurred in the unattended stream.  The correct answer is A. Click EXPLAIN if you want to review this topic.'
      }
      
    },
    {
      id: 2,
      question: 'Which of these scenarios shows that we process unattended speech to some degree?',
      options:
      [
        {
          option: "A. As a low-flying plane passes overhead, you focus on your friend’s lip movements to perceive what she’s saying.",
          id: 'A'
        },
        {
          option: "B. While soothing a crying baby, you carry on a conversation with your neighbor.",
          id: 'B'
        },
        {
          option: "C. During a very interesting movie, you hear the person sitting behind you say “Ouch!” in a low voice.",
          id: 'C'
        },
        {
          option: "D. A door slams, distracting you for a moment, and you miss hearing the final score of the game.",
          id: 'D'
        },
      ],
      answer: 'C',
      answers:
      {
        A: 'Sorry. That result could occur even if the unattended stream was not processed at all.  The correct answer is C. Click EXPLAIN if you want to review this topic.',
        B: 'Sorry. That result could occur even if the unattended stream was not processed at all.  The correct answer is C. Click EXPLAIN if you want to review this topic.',
        C: 'Correct!',
        D: 'Sorry. Typically only salient stimuli are noticed in the unattended stream.  The correct answer is C. Click EXPLAIN if you want to review this topic.'
      }
    },
    {
      id: 3,
      question: 'In the dichotic listening scenario illustrated, why is the participant likely to recall parts of the unattended message?',
      options:
      [
        {
          option: "A. It’s impossible to really ignore what you’re hearing.",
          id: 'A'
        },
        {
          option: "B. The unattended message is very different from the attended message.",
          id: 'B'
        },
        {
          option: "C. The attended message is too dull to claim the participant’s full attention.",
          id: 'C'
        },
        {
          option: "D. The unattended message describes terrifying events.",
          id: 'D'
        },
      ],
      answer: 'D',
      answers:
      {
        A: 'Sorry. Processing of unattended streams is inconsistent with this.  The correct answer is D. Click EXPLAIN if you want to review this topic.',
        B: 'Sorry. Such an effect, if it did occur, would not be advantageous. The correct answer is D. Click EXPLAIN if you want to review this topic.',
        C: 'Sorry. Processing unattended areas to some extent would have the opposite effect. The correct answer is D. Click EXPLAIN if you want to review this topic.',
        D: 'Correct!'
      },
      media: 'assets/images/figure2.png'
    }
  ];
  
  //Functions
  
  //update the current answer variable
  $scope.update= function(id){
    $scope.currentAnswer = id;
  }
  
  //submit the answer - this is where the answer should be submitted to the LMS if required
  $scope.submitAnswer= function() {
    $scope.userFeedback = $scope.questions[$scope.currentQuestion - 1].answers[$scope.currentAnswer];
    if($scope.questions[$scope.currentQuestion - 1].answer == $scope.currentAnswer){
      $scope.currentAnswer = -1;
    }
    $scope.open();
  }
  
  //Navigate through the 3 questions.
  $scope.questionsControl = function(target) {
    if($scope.currentQuestion >= $scope.questions.length )
    {
      if(target == "prev")
      {
        $scope.setFinish(true);
        $scope.prevPage();
      }else
      {
        $scope.nextPage();
      }
    }
    else
    {
      if(target == "prev")
      {
        $scope.prevPage();
      }
      $scope.currentQuestion++;
    }
    $scope.safeApply();
  }
  
  //open modal
  $scope.open = function () {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      resolve: {
        userFeedback: function () {
          return $scope.userFeedback;
        }
      }
    });

    modalInstance.result.then(function () {
      $scope.questionsControl('next');
    }, function () {
      $scope.questionsControl('prev');
    });
  };
  
});

//Modal instance controller
var ModalInstanceCtrl = function ($scope, $modalInstance, userFeedback) {
  $scope.copy = userFeedback;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

//Catch url location change to get user to complete test.
app.directive('confirmOnExit', function() {
  return {
    link: function($scope, elem, attrs) {
      window.onbeforeunload = function(){
        if (!$scope.finished) {
          return "You haven't completed the test";
        }
      }
      $scope.$on('$locationChangeStart', function(event, next, current) {
        if (!$scope.finished) {
          if(!confirm("You haven't completed the test")) {
              event.preventDefault();
          }
        }
      });
    }
  };
});
