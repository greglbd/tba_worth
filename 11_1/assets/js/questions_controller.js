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
      question: 'Why is perception of voiced versus voiceless stop consonants considered categorical rather than continuous?',
      options: 
      [
        { 
          option:  "Perception shifts gradually from one to the other as the stimulus varies.",
          id: 'A'
        },  
        { 
          option:  "Perception shifts abruptly from one to the other as the stimulus varies.",
          id: 'B'
        },
        { 
          option:  "Listeners never perceive voiced stop consonants as voiceless and never perceive voiceless stop consonants as voiced.",
          id: 'C'
        },
        { 
          option:  "In syllables beginning with voiced vs. voiceless stop consonants, differences in the following vowel tell listeners which consonant was heard.",
          id: 'D'
        }  
      ],
      answer: 'D',
      answers:
      {
        B: 'Incorrect. The correct answer is D. Click EXPLAIN if you want to review this topic.',
        A: 'Incorrect. The correct answer is D. Click EXPLAIN if you want to review this topic.',
        C: 'Incorrect. The correct answer is D. Click EXPLAIN if you want to review this topic.',
        D: 'Correct!'
      }
      
    },
    {
      id: 2,
      question: 'In the graph above, at which voice onset time is the phonemic boundary, approximately?',
      options:
      [
        {
          option: "50 msec.",
          id: 'A'
        },
        {
          option: "0 msec",
          id: 'B'
        },
        {
          option: "25 msec",
          id: 'C'
        },
        {
          option: "32 msec",
          id: 'D'
        },
      ],
      answer: 'C',
      answers:
      {
        B: 'Incorrect. The correct answer is A. Click EXPLAIN if you want to review this topic.',
        D: 'Incorrect. The correct answer is A. Click EXPLAIN if you want to review this topic.',
        C: 'Incorrect. The correct answer is A. Click EXPLAIN if you want to review this topic.',
        A: 'Correct!'
      },
      media: 'assets/images/group_graph.png'
    },
    {
      id: 3,
      question: 'Why are synthesized syllables used to investigate the relationship between voice onset time and the categorical perception of stop consonants?',
      options:
      [
        {
          option: "The voice onset time can be precisely controlled in synthesized syllables.",
          id: 'A'
        },
        {
          option: "In actual spoken syllables, the voice onset time is always 0.",
          id: 'B'
        },
        {
          option: "In actual spoken syllables, the voice onset time has no relation to which consonant is perceived.",
          id: 'C'
        },
        {
          option: "Precisely controlling the vowel quality is crucial in accurate perception of voice onset time.",
          id: 'D'
        },
      ],
      answer: 'C',
      answers:
      {
        B: 'Incorrect. The correct answer is C. Click EXPLAIN if you want to review this topic.',
        D: 'Incorrect. The correct answer is C. Click EXPLAIN if you want to review this topic.',
        A: 'Incorrect. The correct answer is C. Click EXPLAIN if you want to review this topic.',
        C: 'Correct!'
      }
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
    //$scope.submit = false;
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
