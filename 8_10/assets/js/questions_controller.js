'use_strict';

/* Questions - unique to each activity */
angular.module('app.questions_controller', [])

.controller('QuestionCtrl', function($scope, $modal){
//Controller for Questionnaire
  //Variables
  $scope.currentQuestion = 1;
  $scope.currentAnswer;
  $scope.userFeedback= '';
  $scope.nextbutton = "Next Question";
  $scope.questions = [
    {
      id: '1',
      question: 'Why do conjunction searches take longer than feature searches?',
      options: 
      [
        { 
          option:  "A. The displays contain more objects in conjunction searches than in feature searches.",
          id: 'A'
        },  
        { 
          option:  "B. In feature searches, the target just “pops out” of the search display. In conjunction searches, the person must examine one object after another in the display, until the target is found.",
          id: 'B'
        },
        { 
          option:  "C. In feature searches, each object has just one feature, so scanning all the objects is quick and easy. In conjunction searches, each object has multiple features, which makes scanning take longer.",
          id: 'C'
        },
        { 
          option:  "D. In conjunction searches, the objects in the display change locations. In feature searches, the objects remain in fixed positions.",
          id: 'D'
        }  
      ],
      answer: 'B',
      answers:
      {
        B: 'Correct!',
        A: 'Sorry. The correct answer is B. Click EXPLAIN if you want to review this topic.',
        C: 'Sorry. Often we do notice salient stimuli, like our name, in unattended converstions. The correct answer is B. Click EXPLAIN if you want to review this topic.',
        D: 'Sorry. Typically we can recall very little about what occurred in the unattended stream.  The correct answer is B. Click EXPLAIN if you want to review this topic.'
      }
      
    },
    {
      id: 2,
      question: 'In this graph of typical group results from a visual search experiment like the one in this demonstration, the curve for feature search is a horizontal line. What does this indicate?	',
      options:
      [
        {
          option: "A. The greater the number of items in the display, the shorter the response time.",
          id: 'A'
        },
        {
          option: "B. The difficulty of determining that the target is absent is offset by the ease of determining that the target is present.",
          id: 'B'
        },
        {
          option: "C. The number of items in the display has no effect on the response time.",
          id: 'C'
        },
        {
          option: "D. Feature searches always have the same number of items in the display.",
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
      },
      media: 'assets/images/group_graph.png'
    },
    {
      id: 3,
      question: 'The target is a red triangle. Which of these displays involve(s) feature search and which  involve(s) conjunction search?',
      options:
      [
        {
          option: "A. Feature search, 1. Conjunction search, 2 and 3.",
          id: 'A'
        },
        {
          option: "B. Feature search, 3. Conjunction search, 1 and 2.",
          id: 'B'
        },
        {
          option: "C. Feature search, 2 and 3. Conjunction search, 1.",
          id: 'C'
        },
        {
          option: "D. Feature search, 1 and 2. Conjunction search, 3.",
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
      media: 'assets/images/question_3.png'
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
    $scope.userAnswer = $scope.currentAnswer;
    $scope.currentAnswer = -1;
    $scope.safeApply();
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
      if(target == 'next')
      {
        $scope.userAnswer = null;
        $scope.currentQuestion++;
        if($scope.currentQuestion >= $scope.questions.length)
        {
          $scope.nextbutton = 'Next';
        }
      }
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
