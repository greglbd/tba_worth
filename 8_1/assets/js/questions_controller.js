'use_strict';

/* Questions - unique to each activity */
angular.module('app.questions_controller', [])

.controller('QuestionCtrl', function($scope, $modal){
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
    $scope.userAnswer = $scope.currentAnswer;
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
});
