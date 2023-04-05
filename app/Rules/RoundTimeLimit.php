<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class RoundTimeLimit implements ValidationRule
{
    const BASE_DELAY = 2;
    const LEVEL_UP = 20;
    const DELAY_DECREASE = 0.95;
    const LEVELS = 6;

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {

        if(!is_array($value)) {
            $fail("Invalid round times received");
            return;
        } else {
            foreach($value as $idx=>$roundTime) {
                $level = floor($idx / self::LEVEL_UP);
                $delay = $level < self::LEVELS ? self::BASE_DELAY * pow(self::DELAY_DECREASE, $idx % self::LEVEL_UP) : self::BASE_DELAY * pow(self::DELAY_DECREASE, $idx + 1 - (self::LEVELS - 1) * self::LEVEL_UP + 1);
                $maxTime = $delay * 8;

                if($roundTime/1000 > $maxTime) {
                    $fail("Invalid round times. Cheating suspected.");
                    return;
                }
            }
        }
    }
}
