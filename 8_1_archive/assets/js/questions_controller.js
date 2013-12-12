'use_strict';

/* Questions - unique to each activity */
angular.module('app.questions_controller', [])

.controller('QuestionCtrl', ['$scope', '$modal', function($scope, $modal){
//Controller for Questionnaire
  //Variables
  $scope.currentQuestion = 1;
  $scope.currentAnswer;
  $scope.userFeedback= '';
  $scope.submit = false;
  $scope.nextbutton = "Next Question";
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
        B: 'Incorrect. The correct answer is A. Click EXPLAIN if you want to review this topic.',
        C: 'Incorrect. The correct answer is A. Click EXPLAIN if you want to review this topic.',
        D: 'Incorrect. The correct answer is A. Click EXPLAIN if you want to review this topic.'
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
        A: 'Incorrect. The correct answer is C. Click EXPLAIN if you want to review this topic.',
        B: 'Incorrect. The correct answer is C. Click EXPLAIN if you want to review this topic.',
        C: 'Correct!',
        D: 'Incorrect. The correct answer is C. Click EXPLAIN if you want to review this topic.'
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
        A: 'Incorrect. The correct answer is D. Click EXPLAIN if you want to review this topic.',
        B: 'Incorrect. The correct answer is D. Click EXPLAIN if you want to review this topic.',
        C: 'Incorrect. The correct answer is D. Click EXPLAIN if you want to review this topic.',
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
    $scope.userAnswer = $scope.currentAnswer;
    $scope.questions[$scope.currentQuestion-1].answered = true;
    $scope.currentAnswer = -1;
    $scope.set_submit(true);
    $scope.safeApply();
    $scope.open('myModalContent.html');
  }
 $scope.set_submit = function(b){
    
    $scope.submit = b;
    $scope.safeApply();
  }
  //Navigate through the 3 questions.
  $scope.questionsControl = function(target) {
    console.log($scope.currentQuestion);
    if($scope.currentQuestion >= $scope.questions.length && target=='next')
    {
      $scope.nextPage();
    }
    else
    {
      if(target == "prev")
      {
        if($scope.currentQuestion == 1)
        {
          $scope.prevPage();
        
        }else
        {
          $scope.currentQuestion--;
          if($scope.questions[$scope.currentQuestion-1].answered )
          {
            $scope.answered = true;
          }else
          {
            $scope.answered = false;
          }
          if($scope.currentQuestion < $scope.questions.length)
          {
            $scope.nextbutton = 'Next Question';
          }
        }
         
      }
      if(target == 'next')
      {
        $scope.userAnswer = null;
        $scope.currentQuestion++;
        if($scope.questions[$scope.currentQuestion-1].answered )
        {
          $scope.answered = true;
        }else
        {
          $scope.answered = false;
        }
        if($scope.currentQuestion >= $scope.questions.length)
        {
          $scope.nextbutton = 'Next';
        }
      }
    }
    $scope.safeApply();
  }
  
  $scope.checkForWarning = function() {
    if(!$scope.submit && !$scope.questions[$scope.currentQuestion-1].answered)
    {
      $scope.open('questionWarning.html');
    }else
    {
      $scope.set_submit(false);
      $scope.questionsControl('next'); 
    }
  }
  
  
  //open modal
  $scope.open = function (template) {
    var modalInstance = $modal.open({
      templateUrl: template,
      controller: ModalInstanceCtrl,
      resolve: {
        userFeedback: function () {
          return $scope.userFeedback;
        }
      }
    });

    modalInstance.result.then(function () {
      
      //$scope.questionsControl('next');
    }, function () {
      //$scope.questionsControl('prev');
    });
  };  
}]);
